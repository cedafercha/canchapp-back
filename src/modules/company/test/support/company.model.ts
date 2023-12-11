import { MockModel } from "../../../../database/test/support/mock.model";
import { Company } from "../../schemas/company.schema";
import { companyStub } from "../stubs/company.stub";

export class CompanyModel extends MockModel<Company> {
    protected entityStub = companyStub();
  }