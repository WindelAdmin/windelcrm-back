import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import IController from '@src/interfaces/Controller.interface'
import { UserCreateDto } from './dtos/UserCreate.dto'
import { UserResponseDto } from './dtos/UserResponse.dto'
import { UserUpdateDto } from './dtos/UserUpdate.dto'
import UserCreateService from './use-cases/UserCreate'
import UserDeleteService from './use-cases/UserDelete'
import UserFindAllService from './use-cases/UserFindAll'
import UserFindByIdService from './use-cases/UserFindById'
import UserUpdateService from './use-cases/UserUpdate'

@ApiTags('user')
@Controller()
export class UserController implements IController<UserCreateDto, UserUpdateDto, UserResponseDto> {
  constructor(
    readonly userCreateService: UserCreateService,
    readonly userUpdateService: UserUpdateService,
    readonly userFindAllService: UserFindAllService,
    readonly userFindByIdService: UserFindByIdService,
    readonly userDeleteService: UserDeleteService
  ) {}

  @Post()
  async create(@Body() data: UserCreateDto): Promise<void> {
    await this.userCreateService.execute(data)
  }

  @Patch()
  async update(@Query('id') id: number, @Body() data: UserUpdateDto): Promise<void> {
    await this.userUpdateService.execute({ id, data })
  }

  @Delete(':id')
  async delete(@Query('id') id: number): Promise<void> {
    await this.userDeleteService.execute(id)
  }

  @Get(':id')
  async findById(@Query('id') id: number): Promise<UserResponseDto> {
    return await this.userFindByIdService.execute(id)
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userFindAllService.execute()
  }
}
