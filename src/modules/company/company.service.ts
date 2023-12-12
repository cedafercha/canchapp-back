import { Injectable } from '@nestjs/common';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

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
}
