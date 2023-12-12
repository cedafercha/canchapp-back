import { IsNotEmpty } from "class-validator";
import { Company } from "src/modules/company/schemas/company.schema";
import { Profile } from "src/modules/profile/schemas/profile.schema";

export class CreateUserCompanyDto {
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    isAdmin: boolean;

    companies: [Company];

    profile?: Profile;
};