
  import { Module } from '@nestjs/common';
import PrismaModule from '@src/infra/persistence/Prisma.module';
import { UserContext } from '../context/UserContext';
import CompanyController from './Company.controller';
import CompanyRepository from './Company.repository';
import CompanyCreateService from './use-cases/CompanyCreate.service';
import CompanyDeleteService from './use-cases/CompanyDelete.service';
import CompanyFindAllService from './use-cases/CompanyFindAll.service';
import CompanyFindByIdService from './use-cases/CompanyFindById.service';
import CompanyUpdateService from './use-cases/CompanyUpdate.service';

  @Module({
    imports: [PrismaModule],
    controllers: [CompanyController],
    providers: [
      CompanyCreateService, 
      CompanyUpdateService, 
      CompanyDeleteService, 
      CompanyFindByIdService, 
      CompanyFindAllService,
      CompanyRepository,
      UserContext
    ],
  })
  export default class CompanyModule {}
  