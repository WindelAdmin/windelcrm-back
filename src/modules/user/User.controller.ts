import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import IController from '@src/interfaces/Controller.interface'
import { BodyChecked } from '@src/shared/decorators/BodyChecked.decorator'
import UserCreateDto from './dtos/UserCreate.dto'
import { UserResponseDto } from './dtos/UserResponse.dto'
import { UserUpdateDto } from './dtos/UserUpdate.dto'
import UserCreateService from './use-cases/UserCreate'
import UserDeleteService from './use-cases/UserDelete'
import UserFindAllService from './use-cases/UserFindAll'
import UserFindByIdService from './use-cases/UserFindById'
import UserUpdateService from './use-cases/UserUpdate'

@ApiTags('user')
@Controller()
export class UserController implements IController<UserCreateDto, UserUpdateDto, any, UserResponseDto> {
  constructor(
    readonly userCreateService: UserCreateService,
    readonly userUpdateService: UserUpdateService,
    readonly userFindAllService: UserFindAllService,
    readonly userFindByIdService: UserFindByIdService,
    readonly userDeleteService: UserDeleteService
  ) {}

  @Post()
  @ApiBody({ type: UserCreateDto })
  async create(@Body() @BodyChecked() data: UserCreateDto): Promise<void> {
    await this.userCreateService.execute(data)
  }

  @Patch(':id')
    @ApiBody({ type: UserUpdateDto })
  async update(@Param('id') id: number, @Body() @BodyChecked() data: UserUpdateDto): Promise<void> {
    await this.userUpdateService.execute({ id, data })
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.userDeleteService.execute(id)
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userFindAllService.execute()
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserResponseDto> {
    return await this.userFindByIdService.execute(id)
  }
}
