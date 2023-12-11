import { companyStub } from "../test/stubs/company.stub";

 export const CompanyService = jest.fn().mockReturnValue({
   findAll: jest.fn().mockResolvedValue([companyStub()]),
   create: jest.fn().mockResolvedValue(companyStub())
 });