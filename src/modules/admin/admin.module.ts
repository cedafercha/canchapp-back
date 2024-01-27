import { Module } from '@nestjs/common';
import { AdminCompanyController } from './admin.company.controller';
import { CompanyModule } from '../company/company.module';
import { GlobalService } from 'src/global.service';

@Module({
  imports: [CompanyModule],
  controllers: [AdminCompanyController],
  providers: [],
  exports: []
})
export class AdminModule {}