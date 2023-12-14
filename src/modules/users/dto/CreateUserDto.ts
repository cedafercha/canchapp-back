import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    userName: string;

    @IsNotEmpty()
    password: string;

    companyId: string;

    profileId: string;
};