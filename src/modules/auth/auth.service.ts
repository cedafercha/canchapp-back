import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/SignInDto';
import { JwtService } from '@nestjs/jwt';
import { Company } from '../company/schemas/company.schema';
import { IJwtPayload } from './interfaces/jwt.payload';
import { IValidationUserData } from './interfaces/validation.user.data';
import { ITokenResponse } from './interfaces/token.response';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(data: SignInDto, isFromMultiLogin: boolean = false): Promise<ITokenResponse> {
        const user = await this.usersService.findByUserName(data.userName);
        const isProvisionalToken = user.companies.length > 1 && !isFromMultiLogin; // Works only for multiLogin
        const currentCompany = this.getCurrentCompany(user.companies, data?.companyId);

        // TODO - Make encrypting!
        const validationObj: IValidationUserData = {
            data,
            user,
            currentCompany,
            isFromMultiLogin,
            isProvisionalToken
        };

        this.validate(validationObj);

        const payload: IJwtPayload = {
            sub: user._id,
            userName: user.userName,
            companies: user.companies,
            profile: user.profile,
            isProvisional: isProvisionalToken,
            currentCompany
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
            isProvisonal: isProvisionalToken
        };
    }

    private getCurrentCompany(companies: Company[], companyId: string): Company {
        if(companies.length === 1){
            return companies[0];
        }

        if(companyId) {
            return companies.find(company => company._id.toString() === companyId);
        }
        
        return null;
    }

    private validate(validationData: IValidationUserData): void {
        const {
            data,
            user,
            currentCompany,
            isFromMultiLogin,
            isProvisionalToken
        } = validationData;

        if(!isFromMultiLogin) {
            if (user?.password !== data.password) {
                throw new UnauthorizedException();
            }
        }

        if(!isProvisionalToken && !currentCompany) {
            throw new UnauthorizedException();
        }
    }
}
