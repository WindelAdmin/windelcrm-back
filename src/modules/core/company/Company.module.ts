
  import { Module } from '@nestjs/common';
import CompanyController from './Company.controller';
import CompanyRepository from './Company.repository';
import CompanyCreateService from './use-cases/CompanyCreate.service';
import CompanyDeleteService from './use-cases/CompanyDelete.service';
import CompanyFindAllService from './use-cases/CompanyFindAll.service';
import CompanyFindByIdService from './use-cases/CompanyFindById.service';
import CompanyUpdateService from './use-cases/CompanyUpdate.service';

  @Module({
    controllers: [CompanyController],
    providers: [
      CompanyCreateService, 
      CompanyUpdateService, 
      CompanyDeleteService, 
      CompanyFindByIdService, 
      CompanyFindAllService,
      CompanyRepository
    ],
  })
  export default class CompanyModule {}
  