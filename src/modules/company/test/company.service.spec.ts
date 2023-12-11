import { Test } from '@nestjs/testing';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { Company } from '../schemas/company.schema';
import { CompanyService } from '../company.service';
import { CompanyRepository } from '../company.repository';
import { companyStub } from './stubs/company.stub';

jest.mock('../company.repository');

describe('CompanyController', () => {
  let companyService: CompanyService;
  let companyRepository: CompanyRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CompanyService, CompanyRepository]
    }).compile();

    companyService = moduleRef.get<CompanyService>(CompanyService);
    companyRepository = moduleRef.get<CompanyRepository>(CompanyRepository);
    jest.clearAllMocks();
  })

  describe('findAll companies', () => {
    describe('when findAll is called', () => {
      let companies: Company[];

      beforeEach(async () => {
        companies = await companyService.findAll();
      })

      test('then it should call companyRepository', () => {
        expect(companyRepository.findAll).toHaveBeenCalled();
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
        company = await companyService.create(createCompanyDto);
      })

      test('then it should call companyRepository', () => {
        expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDto);
      })

      test('then it should return a company', () => {
        expect(company).toEqual(companyStub())
      })
    })
  })
})