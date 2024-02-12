import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Module } from '../../modules/schemas/modules.schema';
import { Transform } from 'class-transformer';
import { Company } from 'src/modules/company/schemas/company.schema';
import { ActionEnum } from 'src/modules/modules/enums/actions.enums';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class ModuleActionSchema {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Module.name })
  module: Module;

  @Prop({ required: true })
  actions: ActionEnum[];
}

@Schema()
export class Profile {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: Company.name })
  company: Company;
  
  @Prop({ required: true, type: [ModuleActionSchema] })
  modules: ModuleActionSchema[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);