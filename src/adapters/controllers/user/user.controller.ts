import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from '@src/application/actors-module/user-module/user.service'
import { UserDto } from '@src/domain/actors/user/dto/user.dto'
import { User } from '@src/domain/actors/user/user.entity'
import { CurrentUser } from '@src/shared/decorators/current-user.decorator'
import { IsPublic } from '@src/shared/decorators/is-public.decorator'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: UserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get('currentUser')
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return user
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id)
  }
}
