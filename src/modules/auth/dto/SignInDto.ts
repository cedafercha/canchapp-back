import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsEmail()
    userName: string;

    @IsNotEmpty()
    password: string;
}