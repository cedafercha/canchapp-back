import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { JWT_SECRET } from './constants/constants';
  import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { IS_PROVISIONAL_TOKEN_KEY } from './decorators/provisional.token.decorator';
import { IS_ADMIN_KEY } from './decorators/admin.decorator';
import { IJwtPayload } from './interfaces/jwt.payload';
import { GlobalService } from 'src/global.service';
import { CompanyService } from '../company/company.service';
import { DecoratorCaseEnum, TokenCaseEnum } from './enums/enums';
  
@Injectable()
export class AuthGuard implements CanActivate {
    private throwUnauthorizedFunc = () => {
        throw new UnauthorizedException();
    };
    private isProvisionalToken: boolean = false;
    private payload: IJwtPayload = null;
    private body: any = undefined;

    // Casos a ejecutar según validación de decoradores!
    private decoratorProcessesByEnumMap = new Map<DecoratorCaseEnum, Function>([
        [DecoratorCaseEnum.TokenNotProviden, () => this.throwUnauthorizedFunc()],
        [DecoratorCaseEnum.AdminTokenNotValid, () => this.throwUnauthorizedFunc()],
        [DecoratorCaseEnum.AdminTokenValid, () => true]
    ]);

    // Procesos a ejecutar según estado del token!
    private tokenProcessesByEnumMap = new Map<TokenCaseEnum | undefined, Function>([
        [TokenCaseEnum.ProvisionalTokenNotReferenced, async () => this.throwUnauthorizedFunc()],
        [TokenCaseEnum.ProvisionalTokenCannotAccess, async () => this.throwUnauthorizedFunc()],
        [TokenCaseEnum.ProvisionalTokenHasAccess, async () => this.validateProvisionalTokenParams()],
        [TokenCaseEnum.TokenAccess, async () => this.tokenAccessProcess()],
        [undefined, async () => this.throwUnauthorizedFunc()]
    ]);

    constructor(
        private readonly jwtService: JwtService,
        private readonly globalService: GlobalService,
        private readonly companyService: CompanyService,
        private readonly reflector: Reflector
    ) {}

    private getDecoratorsValues(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const isProvisionalToken = this.reflector.getAllAndOverride<boolean>(IS_PROVISIONAL_TOKEN_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        return {
            isPublic,
            isProvisionalToken,
            isAdmin
        };
    };
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {isPublic, isProvisionalToken, isAdmin } = this.getDecoratorsValues(context);
        this.isProvisionalToken = isProvisionalToken;

        if (isPublic) {
            this.globalService.setCurrentCompanyId(null);
            this.globalService.setCurrentCompany(null);
            this.globalService.setCurrentUserId(null);
            return true;
        }

        return this.processRequest(context, isAdmin);
    }

    private async processRequest(context: ExecutionContext, isAdmin: boolean) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        this.body = request.body;

        const decoratorCase = this.getDecoratorCaseEnum(token, isAdmin);

        if(decoratorCase){
            return this.decoratorProcessesByEnumMap.get(decoratorCase)();
        }

        return await this.processPayload(token, request);
    }

    private getDecoratorCaseEnum(token: string, isAdmin: boolean): DecoratorCaseEnum {
        const decoratorCaseEnumObj = {
            [DecoratorCaseEnum.TokenNotProviden]: !token,
            [DecoratorCaseEnum.AdminTokenNotValid]: isAdmin && token != IS_ADMIN_KEY,
            [DecoratorCaseEnum.AdminTokenValid]: isAdmin && token == IS_ADMIN_KEY
        };

        return +Object.keys(decoratorCaseEnumObj).find(key => decoratorCaseEnumObj[key] === true);
    }

    private async processPayload(token: string, request: any): Promise<boolean> {
        try {
            const payload: IJwtPayload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: JWT_SECRET
                }
            );

            // We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;

            this.payload = payload;
            
            return await this.tokenProcessesByEnumMap.get(this.getTokenCaseEnum())();
        } catch {
            this.throwUnauthorizedFunc();
        }
    }

    /* se valida el usuario con token provisional que desea acceder a una de sus empresas
     sea válido según el token y la empresa a la que espera iniciar sesión */
    private validateProvisionalTokenParams(): boolean {
        const isValidUserName = this.payload?.userName === this.body?.userName;
        const isValidCompanyId = this.payload?.companies.includes(this.body?.companyId);
        
        if(!isValidUserName || !isValidCompanyId) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private async tokenAccessProcess(): Promise<boolean> {
        const companyId = this.payload.currentCompany.toString();
        this.globalService.setCurrentUserId(this.payload.sub.toString());

        if(await this.globalService.getCurrentCompanyId() !== companyId) {
            this.globalService.setCurrentCompanyId(companyId);
            const company = await this.companyService.getCompanyById(companyId);

            this.globalService.setCurrentCompany(company);
        }

        return true;
    }

    private getTokenCaseEnum(): TokenCaseEnum {
        const tokenCaseEnumObj = {
            [TokenCaseEnum.ProvisionalTokenNotReferenced]: this.getProvisionalTokenNotReferenced(),
            [TokenCaseEnum.ProvisionalTokenCannotAccess]: this.getProvisionalTokenCannotAccess(),
            [TokenCaseEnum.ProvisionalTokenHasAccess]: this.getProvisionalTokenHasAccess(),
            [TokenCaseEnum.TokenAccess]: this.getTokenAccess()
        };

        return +Object.keys(tokenCaseEnumObj).find(key => tokenCaseEnumObj[key] === true);
    }

    // decorador isProvisional pero no llega flag en payload!
    getProvisionalTokenNotReferenced(): boolean {
        return this.isProvisionalToken && !this.payload.isProvisional;
    }

    // Payload de sesión provisional intentando acceder a endpoint protegido
    getProvisionalTokenCannotAccess(): boolean {
        return !this.isProvisionalToken && this.payload.isProvisional;
    }

    // Acceso a endpoint con decorador isProvisional
    getProvisionalTokenHasAccess(): boolean {
        return this.isProvisionalToken && this.payload.isProvisional;
    }

    // Caso correcto, no utiliza decorador ni flag provisional y la compañía existe
    getTokenAccess(): boolean {
        return !this.isProvisionalToken && !this.payload.isProvisional && this.isValidCurrentCompany();
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private isValidCurrentCompany(): boolean {
        // validate multilogin!
        return this.payload.currentCompany 
            === this.payload.companies.find(c => c === this.payload.currentCompany);
    }
}