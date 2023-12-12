import { Company } from "src/modules/company/schemas/company.schema";

export const companyStub = (): Company => {
    return {
        name: 'DUMMYCOMPANY',
        address: 'Street 123',
        identification: '0000'
    };
};