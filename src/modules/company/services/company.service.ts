import { Injectable } from '@nestjs/common';
import { Company } from '../schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';

@Injectable()
export class CompanyService {

  constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}

  async create(newCompany: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(newCompany);
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }
}
