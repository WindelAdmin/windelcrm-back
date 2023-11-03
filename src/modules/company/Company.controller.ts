import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import AbstractController from '@src/interfaces/Controller.abstract'
import CompanyCreateDto from './dtos/CompanyCreate.dto'
import CompanyResponseDto from './dtos/CompanyResponse.dto'
import CompanyUpdateDto from './dtos/CompanyUpdate.dto'
import CompanyCreateService from './use-cases/CompanyCreate.service'
import CompanyDeleteService from './use-cases/CompanyDelete.service'
import CompanyFindAllService from './use-cases/CompanyFindAll.service'
import CompanyFindByIdService from './use-cases/CompanyFindById.service'
import CompanyUpdateService from './use-cases/CompanyUpdate.service'

@ApiTags('company')
@Controller()
export default class CompanyController extends AbstractController<
  CompanyCreateDto,
  CompanyUpdateDto,
  CompanyResponseDto
> {
  constructor(
    readonly companyCreateService: CompanyCreateService,
    readonly companyUpdateService: CompanyUpdateService,
    readonly companyDeleteService: CompanyDeleteService,
    readonly companyFindByIdService: CompanyFindByIdService,
    readonly companyFindAllService: CompanyFindAllService
  ) {
    super(
      companyCreateService,
      companyUpdateService,
      companyDeleteService,
      companyFindAllService,
      companyFindByIdService
    )
  }

}
