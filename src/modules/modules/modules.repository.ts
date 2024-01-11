import { Injectable } from "@nestjs/common";
import { EntityRepository } from "../../database/entity.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GlobalService } from "src/global.service";
import { ModuleDocument, Module } from "./schemas/modules.schema";
import { CreateModuleDto } from "./dto/CreateModuleDto";

@Injectable()
export class ModulesRepository extends EntityRepository<ModuleDocument, CreateModuleDto> {
  constructor(
    @InjectModel(Module.name) userModel: Model<ModuleDocument>,
    globalService: GlobalService
  ) {
    super(userModel, globalService)
  }
}