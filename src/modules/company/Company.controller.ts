import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import IController from '@src/interfaces/Controller.interface'
import CompanyCreateDto from './dtos/CompanyCreate.dto'
import { CompanyDeleteDto } from './dtos/CompanyDeleteDto'
import CompanyResponseDto from './dtos/CompanyResponse.dto'
import CompanyUpdateDto from './dtos/CompanyUpdate.dto'
import CompanyCreateService from './use-cases/CompanyCreate.service'
import CompanyDeleteService from './use-cases/CompanyDelete.service'
import CompanyFindAllService from './use-cases/CompanyFindAll.service'
import CompanyFindByIdService from './use-cases/CompanyFindById.service'
import CompanyUpdateService from './use-cases/CompanyUpdate.service'

@ApiTags('company')
@Controller()
export default class CompanyController implements IController<CompanyCreateDto, CompanyUpdateDto, CompanyDeleteDto, CompanyResponseDto> {
  constructor(
    readonly companyCreateService: CompanyCreateService,
    readonly companyUpdateService: CompanyUpdateService,
    readonly companyDeleteService: CompanyDeleteService,
    readonly companyFindByIdService: CompanyFindByIdService,
    readonly companyFindAllService: CompanyFindAllService
  ) {}

  @Post()
  async create(@Body() data: CompanyCreateDto): Promise<void> {
    await this.companyCreateService.execute(data)
  }

  @Patch()
  async update(@Query('id') id: number, @Body() data: CompanyUpdateDto): Promise<void> {
    await this.companyUpdateService.execute({ id, data })
  }

  @Delete(':id')
  async delete(@Param() params: CompanyDeleteDto): Promise<void> {
    await this.companyDeleteService.execute(+params.id)
  }

  @Get()
  async findAll(): Promise<CompanyResponseDto[]> {
    return await this.companyFindAllService.execute()
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<CompanyResponseDto> {
    return await this.companyFindByIdService.execute(+id)
  }
}
