import { Injectable } from '@nestjs/common';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { CompanyRepository } from './company.repository';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';
import { GlobalService } from 'src/global.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly globalService: GlobalService  
  ) {}

  async getCompanyById(companyId: string): Promise<Company> {
    return this.companyRepository.findOne({ _id: companyId });
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.findAll({});
  }

  async create(newCompany: CreateCompanyDto): Promise<Company> {
    newCompany.name = newCompany.name.toUpperCase();
    return this.companyRepository.create(newCompany);
  }

  async update(companyData: UpdateCompanyDto, companyId?: string): Promise<Company> {
    const company = await this.getCompany(companyId);

    const companyUpdated = this.assignCompanyData(companyData, company);

    return this.companyRepository.findOneAndUpdate({ _id: company._id }, companyUpdated);
  }

  private async getCompany(companyId?: string): Promise<Company> {
    return companyId
      ? await this.getCompanyById(companyId)
      : await this.globalService.getCurrentCompany();
  }

  assignCompanyData(companyData: UpdateCompanyDto, company: Company): Company {
    const keysCompanyData = Object.keys(companyData);

    keysCompanyData.forEach(key => {
      if(companyData[key] && companyData[key] !== company[key]){
        company[key] = companyData[key];
      }
    });
    
    return company;
  }

  async delete(companyId: string) {
    return this.companyRepository.findOneAndDelete({ _id: companyId });
  } 
}
