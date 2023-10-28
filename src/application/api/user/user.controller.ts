import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@src/domain/actors-module/entities/user.entity'
import UserCreateService from '@src/domain/actors-module/services/user/userCreate'
import UserQueryService from '@src/domain/actors-module/services/user/userQuery'
import { IsPublic } from '@src/shared/decorators/is-public.decorator'
import { UserDto } from './dto/user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userCreateService: UserCreateService,
    private readonly userQueryService: UserQueryService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: UserDto): Promise<void> {
    await this.userCreateService.execute(createUserDto)
  }

  @Get('/findById')
  @IsPublic()
  async findById(id: number): Promise<User> {
    return this.userQueryService.findById(id, ['password'])
  }

  @Get('/')
  @IsPublic()
  async findAll(id: number): Promise<User[]> {
    return this.userQueryService.findAll(['password'])
  }

  @Get('findByField')
  @IsPublic()
  async findByField(@Query('field') field: string, @Query('value') value: any): Promise<User[]> {
    return this.userQueryService.findManyByField(field, value, ['password'])
  }
}
