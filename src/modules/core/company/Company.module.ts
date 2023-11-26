import { Module } from '@nestjs/common'
import CompanyController from './Company.controller'
import CompanyRepository from './Company.repository'
import CompanyCreateService from './use-cases/CompanyCreate.usecase'
import CompanyDeleteService from './use-cases/CompanyDelete.usecase'
import CompanyFindAllService from './use-cases/CompanyFindAll.usecase'
import CompanyFindByIdService from './use-cases/CompanyFindById.usecase'
import CompanyUpdateService from './use-cases/CompanyUpdate.usecase'

@Module({
  controllers: [CompanyController],
  providers: [CompanyCreateService, CompanyUpdateService, CompanyDeleteService, CompanyFindByIdService, CompanyFindAllService, CompanyRepository]
})
export default class CompanyModule {}
