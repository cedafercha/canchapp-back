import { Injectable } from "@nestjs/common";
import { EntityRepository } from "../../database/entity.repository";
import { CreateCompanyDto } from "./dto/CreateCompanyDto";
import { Company, CompanyDocument } from "./schemas/company.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GlobalService } from "src/global.service";

@Injectable()
export class CompanyRepository extends EntityRepository<CompanyDocument, CreateCompanyDto> {
  constructor(
    @InjectModel(Company.name) userModel: Model<CompanyDocument>,
    globalService: GlobalService
  ) {
    super(userModel, globalService)
  }
}