import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserDto } from './dtos/User.dto'
import { UserCreateDto } from './dtos/UserCreate.dto'
import { UserUpdateDto } from './dtos/UserUpdate.dto'
import UserCreateService from './use-cases/UserCreate'
import UserDeleteService from './use-cases/UserDelete'
import UserFindByIdService from './use-cases/UserFindById'
import UserUpdateService from './use-cases/UserUpdate'

@ApiTags('user')
@Controller()
export class UserController{

  constructor(private readonly userCreateService: UserCreateService, private readonly userUpdateService: UserUpdateService, private readonly userFindById: UserFindByIdService, private readonly userDeleteService: UserDeleteService) {}

  @Post()
  async create(data: UserCreateDto): Promise<void> {
      await this.userCreateService.execute(data)
  }

  @Patch()
  async update(@Query('id') id: number, data: UserUpdateDto): Promise<void> {
    await this.userUpdateService.execute({id, data})
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
     await this.userDeleteService.execute(id)
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserDto> {
     return await this.userFindById.execute(id)
  }
}
