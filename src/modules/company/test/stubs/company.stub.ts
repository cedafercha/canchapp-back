import { Company } from "src/modules/company/schemas/company.schema";

export const companyStub = (): Company => {
    return {
        name: 'DummyCompany',
        address: 'Street 123',
        identification: '0000'
    };
};