import { Injectable } from '@nestjs/common';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.findAll({});
  }

  async create(newCompany: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.create(newCompany);
  }
}
