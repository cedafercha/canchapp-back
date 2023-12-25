import { Inject, Injectable } from "@nestjs/common";
import { Company } from "./modules/company/schemas/company.schema";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class GlobalService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}

    public async getCurrentCompanyId() {
        return await this.cacheManager.get('currentCompanyId');
    }

    public async setCurrentCompanyId(companyId: string) {
        await this.cacheManager.set('currentCompanyId', companyId, 0);
    }

    public async getCurrentCompany() {
        return await this.cacheManager.get('currentCompany');
    };

    public async setCurrentCompany(company: Company) {
        await this.cacheManager.set('currentCompany', company, 0);
    }
};