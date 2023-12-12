import { Model, Document, FilterQuery } from "mongoose";

export abstract class EntityRepository<MongoModel extends Document, Dto> {
  constructor(protected readonly entityModel: Model<MongoModel>) {}

  async findAll(entityFilterQuery: FilterQuery<MongoModel>): Promise<MongoModel[] | null> {
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
    return this.entityModel.findOne(entityFilterQuery, {
      __v: 0,
      ...projection
    }).exec()
  }
}