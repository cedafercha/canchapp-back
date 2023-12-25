import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './modules/company/company.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ModulesModule } from './modules/modules/modules.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CacheModule.register({
      isGlobal: true,
    }),
    CompanyModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    ModulesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
