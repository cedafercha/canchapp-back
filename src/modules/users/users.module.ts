import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { ProfileModule } from '../profile/profile.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/__mocks__/company.repository';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // ProfileModule
    CompanyModule,
    ProfileModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository
  ]
})
export class UsersModule {}
