import { Test } from '@nestjs/testing'
import CompanyController from '@src/modules/company/Company.controller'
import CompanyCreateService from '@src/modules/company/use-cases/CompanyCreate.service'
import CompanyDeleteService from '@src/modules/company/use-cases/CompanyDelete.service'
import CompanyFindAllService from '@src/modules/company/use-cases/CompanyFindAll.service'
import CompanyFindByIdService from '@src/modules/company/use-cases/CompanyFindById.service'
import CompanyUpdateService from '@src/modules/company/use-cases/CompanyUpdate.service'

describe('CompanyController', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyCreateService, CompanyUpdateService, CompanyDeleteService, CompanyFindByIdService, CompanyFindAllService]
    }).compile()

    controller = module.get<CompanyController>(CompanyController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  // Add more test cases for your controller methods here
});
