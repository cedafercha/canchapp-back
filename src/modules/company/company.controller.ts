import { 
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Body
} from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/CreateCompanyDto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('findAll')
  async findAll(): Promise<Company[]> {
    try {
        return await this.companyService.findAll();   
    }
    catch(e){
        console.log('Error ' + e);
        throw new InternalServerErrorException('Something bad happened', { cause: e });
    }
  }

  @Post('create')
  async create(@Body() newCompany: CreateCompanyDto): Promise<Company> {
    return await this.companyService.create(newCompany);
  };
}
