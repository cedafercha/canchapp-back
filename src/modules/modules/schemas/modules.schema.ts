import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument} from 'mongoose';

export type ModuleDocument = HydratedDocument<Module>;

@Schema()
export class Module {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({ required: true })
  name: string;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);