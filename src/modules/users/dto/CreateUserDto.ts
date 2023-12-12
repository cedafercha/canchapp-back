import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;

    companyId: string;

    profileId: string;
};