import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument} from 'mongoose';
import { ActionEnum } from '../enums/actions.enums';

export type ModuleDocument = HydratedDocument<Module>;

@Schema()
export class Module {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  tabID: number;

  @Prop({ required: true })
  actions: ActionEnum[];

  // childs: ModuleChild[];
}

/*export class ModuleChild {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  tabID: number;
}*/

export const ModuleSchema = SchemaFactory.createForClass(Module);