import { Injectable } from "@nestjs/common";
import { EntityRepository } from "../../database/entity.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserCompanyDto } from "./dto/CreateUserCompanyDto";
import { Company } from "../company/schemas/company.schema";
import { GlobalService } from "src/global.service";

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument, CreateUserCompanyDto> {
  constructor(
    @InjectModel(User.name) userModel: Model<UserDocument>,
    globalService: GlobalService
  ) {
    super(userModel, globalService)
    this.useGetCompanyFilter = true;
    this.useMultiCompanyFilter = true;
  }

  async addCompanyToUser(userName: string, company: Company): Promise<boolean> {
    const res = await this.entityModel.updateOne({
        userName:userName
      },
      { $addToSet: {
          companies: company
      }
    });

    return res.acknowledged;
  };

  async findCompanies(): Promise<Company[]> {
    const userId = await this.globalService.getCurrentUserId();

    return (
      await this.entityModel.findById({_id: userId}).populate('companies')
    ).companies;
  }  
}