import { 
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Body
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/CreateCompanyDto';

@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

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

  @Post('create')
  async create(@Body() newCompany: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(newCompany);
  };
}
