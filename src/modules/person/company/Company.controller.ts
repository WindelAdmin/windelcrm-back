import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import AbstractController from '@src/interfaces/AbstractController'
import CompanyRepository from '@src/modules/person/company/Company.repository'
import CompanyService from './Company.service'

@ApiTags('company')
@Controller('company')
export class CompanyController extends AbstractController<CompanyService, CompanyRepository> {}
