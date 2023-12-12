import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';
import { Profile } from 'src/modules/profile/schemas/profile.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;
  
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  isAdmin: boolean;

  @Prop({ required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: Company.name}] })
  companies: [Company];

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: Profile.name })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);