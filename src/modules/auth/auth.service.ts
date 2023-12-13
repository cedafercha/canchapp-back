import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/SignInDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(data: SignInDto): Promise<any> {
        const user = await this.usersService.findOneByUserName(data.userName);
        if (user?.password !== data.password) {
          throw new UnauthorizedException();
        }

        const payload = {
            sub: user._id,
            username: user.userName,
            companies: user.companies,
            profile: user.profile
        };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
