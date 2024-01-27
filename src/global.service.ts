import { Inject, Injectable } from "@nestjs/common";
import { Company } from "./modules/company/schemas/company.schema";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class GlobalService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}

    public async getCurrentCompanyId(): Promise<string> {
        return await this.cacheManager.get('currentCompanyId');
    }

    public async setCurrentCompanyId(companyId: string): Promise<void> {
        await this.cacheManager.set('currentCompanyId', companyId, 0);
    }

    public async getCurrentCompany(): Promise<Company> {
        return await this.cacheManager.get('currentCompany');
    };

    public async setCurrentCompany(company: Company): Promise<void> {
        await this.cacheManager.set('currentCompany', company, 0);
    }

    public async getCurrentUserId(): Promise<string> {
        return await this.cacheManager.get('currentUserId');
    };

    public async setCurrentUserId(userId: string): Promise<void> {
        await this.cacheManager.set('currentUserId', userId, 0);
    }

    public async getIsAdminUser(): Promise<boolean> {
        return await this.cacheManager.get('isAdminUser');
    };

    public async setIsAdminUser(isAdmin: boolean): Promise<void> {
        await this.cacheManager.set('isAdminUser', isAdmin, 0);
    }
};