import { Test } from '@nestjs/testing';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { Company } from '../schemas/company.schema';
import { CompanyController } from '../company.controller';
import { CompanyService } from '../company.service';
import { companyStub } from './stubs/company.stub';

jest.mock('../company.service');

describe('CompanyController', () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [CompanyController],
      providers: [CompanyService]
    }).compile();

    companyController = moduleRef.get<CompanyController>(CompanyController);
    companyService = moduleRef.get<CompanyService>(CompanyService);
    jest.clearAllMocks();
  })

  describe('findAll companies', () => {
    describe('when findAll is called', () => {
      let companies: Company[];

      beforeEach(async () => {
        companies = await companyController.findAll();
      })

      test('then it should call companyService', () => {
        expect(companyService.findAll).toHaveBeenCalled();
      })

      test('then it should return companies', () => {
        expect(companies).toEqual([companyStub()])
      })
    })
  })

  describe('createCompany', () => {
    describe('when create is called', () => {
      let company: Company;
      let createCompanyDto: CreateCompanyDto;

      beforeEach(async () => {
        createCompanyDto = {
            name: companyStub().name,
            identification: companyStub().identification,
            address: companyStub().address
        }
        company = await companyController.create(createCompanyDto);
      })

      test('then it should call companyService', () => {
        expect(companyService.create).toHaveBeenCalledWith(createCompanyDto);
      })

      test('then it should return a company', () => {
        expect(company).toEqual(companyStub())
      })
    })
  })
})