import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';
import { Module } from '../../modules/schemas/modules.schema';
import { Transform } from 'class-transformer';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({ required: true })
  name: string;

  /*@Prop({ required: true })
  modules: Module[];*/

  /*
  @Prop({ required: true })
  companyId: string;*/
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);