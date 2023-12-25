import { Model, Document, FilterQuery, Types } from "mongoose";
import { GlobalService } from "src/global.service";

export abstract class EntityRepository<MongoModel extends Document, Dto> {
  protected useCompanyFilter: boolean = false;

  constructor(
    protected readonly entityModel: Model<MongoModel>,
    protected readonly globalService: GlobalService
    ) {}

  async findAll(entityFilterQuery: FilterQuery<MongoModel>): Promise<MongoModel[] | null> {
    if(this.useCompanyFilter){
      entityFilterQuery = await this.getFilterByCompanyId(entityFilterQuery);
    }
    return this.entityModel.find(entityFilterQuery);
  }

  async create(createEntityData: Dto): Promise<MongoModel> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOne(
    entityFilterQuery: FilterQuery<MongoModel>,
    projection?: Record<string, unknown>
  ): Promise<MongoModel | null> {
    if(this.useCompanyFilter){
      entityFilterQuery = await this.getFilterByCompanyId(entityFilterQuery);
    }
    return this.entityModel.findOne(entityFilterQuery, {
      __v: 0,
      ...projection
    }).exec()
  }

  async getFilterByCompanyId(entityFilterQuery: FilterQuery<MongoModel>): Promise<FilterQuery<MongoModel>> {
    const companyId = await this.getCompanyId();
    return Object.assign({}, entityFilterQuery, {companies: { $in: [companyId] }});
  }

  async getCompanyId() {
    return await this.globalService.getCurrentCompanyId();
  }
}