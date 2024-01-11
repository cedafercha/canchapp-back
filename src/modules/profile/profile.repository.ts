import { Injectable } from "@nestjs/common";
import { EntityRepository } from "../../database/entity.repository";
import { CreateProfileDto } from "./dto/CreateProfileDto";
import { Profile, ProfileDocument } from "./schemas/profile.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GlobalService } from "src/global.service";

@Injectable()
export class ProfileRepository extends EntityRepository<ProfileDocument, CreateProfileDto> {
  constructor(
    @InjectModel(Profile.name) userModel: Model<ProfileDocument>,
    globalService: GlobalService
  ) {
    super(userModel, globalService);
    this.useGetCompanyFilter = true;
    this.useInsertCompanyFilter = true;
  }
}