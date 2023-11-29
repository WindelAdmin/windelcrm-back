
  import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import IController from '@shared/interfaces/Controller.interface'
import PermissionCreateDto from './dtos/PermissionCreate.dto'
import PermissionDeleteDto from './dtos/PermissionDelete.dto'
import PermissionResponseDto from './dtos/PermissionResponse.dto'
import PermissionUpdateDto from './dtos/PermissionUpdate.dto'
import PermissionCreate from './use-cases/PermissionCreate.usecase'
import PermissionDelete from './use-cases/PermissionDelete.usecase'
import PermissionFindAll from './use-cases/PermissionFindAll.usecase'
import PermissionFindById from './use-cases/PermissionFindById.usecase'
import PermissionUpdate from './use-cases/PermissionUpdate.usecase'

  @ApiTags('permission')
  @Controller()
  export default class PermissionController implements IController<PermissionCreateDto, PermissionUpdateDto, PermissionDeleteDto, PermissionResponseDto> {

    constructor(
      readonly permissionCreate: PermissionCreate, 
      readonly permissionUpdate: PermissionUpdate, 
      readonly permissionDelete: PermissionDelete,
      readonly permissionFindById: PermissionFindById, 
      readonly permissionFindAll: PermissionFindAll) {}

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED })
    async create(@Body() data: PermissionCreateDto): Promise<void> {
      await this.permissionCreate.execute(data)
    }

    @Patch('=:id')
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    async update(@Param('id') id: number, @Body() data: PermissionUpdateDto): Promise<void> {
      await this.permissionUpdate.execute(id, data )
    }

    @Delete('=:id')
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    async delete(@Param() params: PermissionDeleteDto): Promise<void> {
      await this.permissionDelete.execute(+params.id)
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [PermissionResponseDto] })
    async findAll(): Promise<PermissionResponseDto[]> {
      return await this.permissionFindAll.execute()
    }

    @Get('=:id')
    @ApiResponse({ status: HttpStatus.OK, type: PermissionResponseDto })
    async findById(@Param('id') id: number): Promise<PermissionResponseDto> {
      return await this.permissionFindById.execute(+id)
    }
  }
  