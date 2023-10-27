import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@src/domain/actors-module/entities/user.entity'
import UserFindByEmailService from '@src/domain/actors-module/services/user/findByEmail'
import UserCreateService from '@src/domain/actors-module/services/user/userCreate'
import { IsPublic } from '@src/shared/decorators/is-public.decorator'
import { UserDto } from './dto/user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userCreateUseCase: UserCreateService, private readonly userFindByEmail: UserFindByEmailService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: UserDto): Promise<void> {
      await this.userCreateUseCase.execute(createUserDto)
  }

  @Get()
  @IsPublic()
  async getByEmail(@Query('email') email: string): Promise<User> {
    return this.userFindByEmail.execute(email)
  }
}
