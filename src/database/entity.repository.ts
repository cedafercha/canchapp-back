import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";
import { GlobalService } from "src/global.service";

export abstract class EntityRepository<MongoModel extends Document, Dto> {
  protected useMultiCompanyFilter: boolean = false;
  protected useGetCompanyFilter: boolean = false;
  protected useInsertCompanyFilter: boolean = false;

  constructor(
    protected readonly entityModel: Model<MongoModel>,
    protected readonly globalService: GlobalService
    ) {}

  async findAll(entityFilterQuery: FilterQuery<MongoModel>): Promise<MongoModel[] | null> {
    if(this.useGetCompanyFilter){
      entityFilterQuery = await this.getFilterByCompanyId(entityFilterQuery);
    }
    return this.entityModel.find(entityFilterQuery);
  }

  async create(createEntityData: Dto): Promise<MongoModel> {
    if(this.useInsertCompanyFilter){
      createEntityData = await this.getInsertByCompany(createEntityData);
    }
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<MongoModel>,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<MongoModel | null> {
    if(this.useGetCompanyFilter){
      entityFilterQuery = await this.getFilterByCompanyId(entityFilterQuery);
    }
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true 
      }
    )
  }

  async findOne(
    entityFilterQuery: FilterQuery<MongoModel>,
    projection?: Record<string, unknown>
  ): Promise<MongoModel | null> {
    if(this.useGetCompanyFilter){
      entityFilterQuery = await this.getFilterByCompanyId(entityFilterQuery);
    }
    return this.entityModel.findOne(entityFilterQuery, {
      __v: 0,
      ...projection
    }).exec()
  }

  async getFilterByCompanyId(entityFilterQuery: FilterQuery<MongoModel>): Promise<FilterQuery<MongoModel>> {
    const companyId = await this.getCompanyId();
    if(companyId){
      return Object.assign(
        {},
        entityFilterQuery,
        this.getCompanyFilter(companyId)
      );
    }
    return entityFilterQuery;
  }

  getCompanyFilter(companyId){
    return this.useMultiCompanyFilter
      ? {companies: { $in: [companyId] }}
      : { company: companyId };
  }

  async getInsertByCompany(data: Dto): Promise<Dto> {
    const company = await this.getCompany();
    return Object.assign(
      {},
      data,
      { company: company }
    );
  }

  async getCompanyId() {
    return await this.globalService.getCurrentCompanyId();
  }

  async getCompany() {
    return await this.globalService.getCurrentCompany();
  }
}