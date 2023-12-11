import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument} from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;
//export type CompanyDocument = Company & Document;

@Schema()
export class Company {
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