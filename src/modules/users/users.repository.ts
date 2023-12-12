import { Injectable } from "@nestjs/common";
import { EntityRepository } from "../../database/entity.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserCompanyDto } from "./dto/CreateUserCompanyDto";

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument, CreateUserCompanyDto> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel)
  }
}