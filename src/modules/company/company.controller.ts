import { 
    Controller,
    Get,
    Post,
    Body,
    Param
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './schemas/company.schema';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';

@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('find/:id')
  async getProfileById(@Param('id') companyId: string): Promise<Company> {
      return this.companyService.getCompanyById(companyId);
  }

  @Post('update')
  async update(@Body() company: UpdateCompanyDto): Promise<Company> {
    return this.companyService.update(company);
  }
}
