import { 
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Body,
    Param
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { Admin } from '../auth/decorators/admin.decorator';
import { UpdateCompanyDto } from './dto/UpdateCompanyDto';

@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Admin()
  @Get('findAll')
  async findAll(): Promise<Company[]> {
    try {
        return this.companyService.findAll();   
    }
    catch(e){
        console.log('Error ' + e);
        throw new InternalServerErrorException(e.message, { cause: e });
    }
  }

  @Get('find/:id')
  async getProfileById(@Param('id') companyId: string): Promise<Company> {
      return this.companyService.getCompanyById(companyId);
  }

  @Admin()
  @Post('create')
  async create(@Body() newCompany: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(newCompany);
  };

  @Post('update')
  async update(@Body() company: UpdateCompanyDto): Promise<Company> {
    return this.companyService.update(company);
  }
}
