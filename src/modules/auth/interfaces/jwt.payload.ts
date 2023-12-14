import { Company } from "src/modules/company/schemas/company.schema";
import { Profile } from "src/modules/profile/schemas/profile.schema";

export interface IJwtPayload {
    sub: string;
    userName: string;
    isProvisional: boolean;
    companies: Company[];
    profile?: Profile;
    currentCompany?: Company;
    iat?: number;
    exp?: number;
    jti?: string;
};