import { Model, Document, FilterQuery } from "mongoose";

export abstract class EntityRepository<MongoModel extends Document, Dto> {
  constructor(protected readonly entityModel: Model<MongoModel>) {}

  /*async create(newElement: Dto): Promise<MongoModel> {
    const createdElement = new this.entityModel(newElement);
    return createdElement.save();
  }*/
    
    /*async findAll(): Promise<MongoModel[]> {
      return this.model.find().exec();
    }*/

  async findAll(entityFilterQuery: FilterQuery<MongoModel>): Promise<MongoModel[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async create(createEntityData: Dto): Promise<MongoModel> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }
}