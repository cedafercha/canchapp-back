import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument} from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Transform(({ value }) => value.toString())
  _id?: string;
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  coordinates?: string;

  @Prop({ required: true })
  identification: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);