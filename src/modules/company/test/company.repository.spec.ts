import { FilterQuery } from "mongoose";
import { CompanyRepository } from "../company.repository";
import { Company, CompanyDocument } from "../schemas/company.schema";
import { CompanyModel } from "./support/company.model";
import { Test } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { companyStub } from "./stubs/company.stub";

describe('CompanyRepository', () => {
  let companyRepository: CompanyRepository;

  describe('find operations', () => {
    let companyModel: CompanyModel;
    let companyFilterQuery: FilterQuery<CompanyDocument>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          CompanyRepository,
          {
            provide: getModelToken(Company.name),
            useClass: CompanyModel
          }
        ]
      }).compile();

      companyRepository = moduleRef.get<CompanyRepository>(CompanyRepository);
      companyModel = moduleRef.get<CompanyModel>(getModelToken(Company.name));
      companyFilterQuery = {};
      jest.clearAllMocks();
    })

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let companies: Company[];

        beforeEach(async () => {
          jest.spyOn(companyModel, 'find');
          companies = await companyRepository.findAll(companyFilterQuery);
        })

        test('then it should call the companyModel', () => {
          expect(companyModel.find).toHaveBeenCalled();
        })

        test('then it should return a user', () => {
          expect(companies).toEqual([companyStub()]);
        })
      })
    })
  })

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          CompanyRepository,
          {
            provide: getModelToken(Company.name),
            useValue: CompanyModel,
          },
        ],
      }).compile();

      companyRepository = moduleRef.get<CompanyRepository>(CompanyRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let company: Company;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(CompanyModel.prototype, 'save');
          constructorSpy = jest.spyOn(CompanyModel.prototype, 'constructorSpy');
          company = await companyRepository.create(companyStub());
        })

        test('then it should call the companyModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(companyStub())
        })

        test('then it should return a company', () => {
          expect(company).toEqual(companyStub());
        })
      })
    })
  })
})