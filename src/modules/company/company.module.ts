import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompanyRepository } from './company.repository';
import { GlobalService } from 'src/global.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, GlobalService],
  exports: [CompanyService, CompanyRepository]
})
export class CompanyModule {}