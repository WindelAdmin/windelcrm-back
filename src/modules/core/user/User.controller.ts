import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { BodyChecked } from '@shared/decorators/BodyChecked.decorator'
import IController from '@shared/interfaces/Controller.interface'
import UserCreateDto from './dtos/UserCreate.dto'
import { UserDeleteDto } from './dtos/UserDeleteDto'
import { UserResponseDto } from './dtos/UserResponse.dto'
import { UserUpdateDto } from './dtos/UserUpdate.dto'
import UserCreateService from './use-cases/UserCreate.usecase'
import UserDeleteService from './use-cases/UserDelete.usecase'
import UserFindAllService from './use-cases/UserFindAll.usecase'
import UserFindByIdService from './use-cases/UserFindById.usecase'
import UserUpdateService from './use-cases/UserUpdate.usecase'

@ApiTags('user')
@Controller()
export class UserController implements IController<UserCreateDto, UserUpdateDto, UserDeleteDto, UserResponseDto> {
  constructor(
    readonly userCreateService: UserCreateService,
    readonly userUpdateService: UserUpdateService,
    readonly userFindAllService: UserFindAllService,
    readonly userFindByIdService: UserFindByIdService,
    readonly userDeleteService: UserDeleteService
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(@Body() @BodyChecked() data: UserCreateDto): Promise<void> {
    await this.userCreateService.execute(data)
  }

  @Patch('=:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async update(@Param('id') id: number, @Body() @BodyChecked() data: UserUpdateDto): Promise<void> {
    await this.userUpdateService.execute({ id, data })
  }

  @Delete('=:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async delete(@Param() params: UserDeleteDto): Promise<void> {
    await this.userDeleteService.execute(params.id)
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [UserResponseDto] })
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userFindAllService.execute()
  }

  @Get('=:id')
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  async findById(@Param('id') id: number): Promise<UserResponseDto> {
    return await this.userFindByIdService.execute(id)
  }
}
