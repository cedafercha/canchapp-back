import { companyStub } from "../test/stubs/company.stub";

 export const CompanyRepository = jest.fn().mockReturnValue({
   findAll: jest.fn().mockResolvedValue([companyStub()]),
   create: jest.fn().mockResolvedValue(companyStub())
 });