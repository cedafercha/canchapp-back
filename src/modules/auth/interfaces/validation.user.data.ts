import { User } from "src/modules/users/schemas/user.schema";
import { SignInDto } from "../dto/SignInDto";
import { Company } from "src/modules/company/schemas/company.schema";

export interface IValidationUserData {
    data: SignInDto;
    user: User;
    currentCompany: Company;
    isFromMultiLogin: boolean;
    isProvisionalToken: boolean;
};