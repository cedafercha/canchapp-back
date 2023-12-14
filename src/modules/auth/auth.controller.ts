import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignInDto';
import { Public } from './decorators/public.decorator';
import { ProvisionalToken } from './decorators/provisional.token.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public() // Use this to make public endpoint
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('multilogin')
    @ProvisionalToken() // Use this to make provitionalToken only endpoint
    multiLoginSignIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto, true);
    }
}
