import { Injectable } from "@nestjs/common";
import { EntityRepository } from "../../database/entity.repository";
import { CreateProfileDto } from "./dto/CreateProfileDto";
import { Profile, ProfileDocument } from "./schemas/profile.schema";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class ProfileRepository extends EntityRepository<ProfileDocument, CreateProfileDto> {
  constructor(@InjectModel(Profile.name) userModel: Model<ProfileDocument>) {
    super(userModel)
  }
}