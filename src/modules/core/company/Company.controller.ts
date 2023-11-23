import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import IController from '@shared/interfaces/Controller.interface'
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
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(@Body() data: CompanyCreateDto): Promise<void> {
    await this.companyCreateService.execute(data)
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async update(@Param('id') id: number, @Body() data: CompanyUpdateDto): Promise<void> {
    await this.companyUpdateService.execute({ id, data })
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async delete(@Param() params: CompanyDeleteDto): Promise<void> {
    await this.companyDeleteService.execute(+params.id)
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [CompanyResponseDto] })
  async findAll(): Promise<CompanyResponseDto[]> {
    return await this.companyFindAllService.execute()
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CompanyResponseDto })
  async findById(@Param('id') id: number): Promise<CompanyResponseDto> {
    return await this.companyFindByIdService.execute(+id)
  }
}
