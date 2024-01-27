import { 
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Body,
    Param,
    Put,
    Delete
} from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/schemas/company.schema';
import { Admin } from '../auth/decorators/admin.decorator';
import { UpdateCompanyDto } from '../company/dto/UpdateCompanyDto';
import { CreateCompanyDto } from '../company/dto/CreateCompanyDto';

@Admin()
@Controller('api/v1/admin/company')
export class AdminCompanyController {
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

  @Get('find/:id')
  async getProfileById(@Param('id') companyId: string): Promise<Company> {
      return this.companyService.getCompanyById(companyId);
  }
  
  @Post('create')
  async create(@Body() newCompany: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(newCompany);
  };

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() company: UpdateCompanyDto): Promise<Company> {
    if(!id) {
        throw new InternalServerErrorException('Id must be defined!');
    }
    return this.companyService.update(company, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<Company> {
    // TODO - Validar que la empresa no tenga data relacionada
    // TODO - Mejor manejar estado inactiva/activa?
    return null;
    // return this.companyService.delete(id);
  }
}