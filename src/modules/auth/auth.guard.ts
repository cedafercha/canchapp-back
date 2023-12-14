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
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const isProvisionalToken = this.reflector.getAllAndOverride<boolean>(IS_PROVISIONAL_TOKEN_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const isAdminToken = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const body = this.extractBody(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        if(isAdminToken && token != IS_ADMIN_KEY) {
            throw new UnauthorizedException();
        }

        if(isAdminToken && token == IS_ADMIN_KEY) {
            return true;
        }

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
            
            return this.validateTokenPayload(payload, isProvisionalToken, body);
        } catch {
            throw new UnauthorizedException();
        }
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractBody(request: Request): any {
        return request.body;
    }

    private validateTokenPayload(payload: IJwtPayload, isProvisionalToken: boolean, body: any): boolean {
        // validate multilogin!
        const isValidCurrentCompany = this.validateCurrentCompany(payload);

        // decorador isProvisional pero no llega flag en payload!
        if(isProvisionalToken && !payload.isProvisional) {
            throw new UnauthorizedException();
        }

        // Payload de sesión provisional intentando acceder a endpoint protegido
        if(!isProvisionalToken && payload.isProvisional) {
            throw new UnauthorizedException();
        }

        // Acceso a endpoint con decorador isProvisional
        if(isProvisionalToken && payload.isProvisional) {
            this.validateProvisionalTokenParams(payload, body);
            return true;
        }

        // Caso correcto, no utiliza decorador ni flag provisional y la compañía existe
        if(!isProvisionalToken && !payload.isProvisional && isValidCurrentCompany){
            return true;
        }

        throw new UnauthorizedException();
    }

    private validateCurrentCompany(payload: IJwtPayload): boolean {
        return payload.currentCompany === payload.companies.find(c => c === payload.currentCompany);
    }

    /* se valida el usuario con token provisional que desea acceder a una de sus empresas
     sea válido según el token y la empresa a la que espera iniciar sesión */
    private validateProvisionalTokenParams(payload: IJwtPayload, body: any): void {
        const isValidUserName = payload?.userName === body?.userName;
        const isValidCompanyId = payload.companies.includes(body.companyId);
        
        if(!isValidUserName || !isValidCompanyId) {
            throw new UnauthorizedException();
        }
    }
}