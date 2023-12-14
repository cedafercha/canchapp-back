import { IsEmail, IsNotEmpty } from "class-validator";

export class AddCompanyToUserDto {
    @IsEmail()
    userName: string;

    @IsNotEmpty()
    companyId: string;
};