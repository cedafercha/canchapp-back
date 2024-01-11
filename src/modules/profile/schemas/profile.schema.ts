import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument} from 'mongoose';
import { Module } from '../../modules/schemas/modules.schema';
import { Transform } from 'class-transformer';
import { Company } from 'src/modules/company/schemas/company.schema';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: Company.name })
  company: Company;

  @Prop({ required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: Module.name}] })
  modules: [Module];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);