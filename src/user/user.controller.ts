import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { IsPublic } from 'src/auth/decorators/is-public.decorator'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('users')
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
