import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { ProfileModule } from '../profile/profile.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { CompanyModule } from '../company/company.module';
import { GlobalService } from 'src/global.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CompanyModule,
    ProfileModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, GlobalService],
  exports: [UsersService, UsersRepository]
})
export class UsersModule {}
