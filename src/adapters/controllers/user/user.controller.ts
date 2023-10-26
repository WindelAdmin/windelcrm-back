import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import UserCreateUseCase from '@src/application/actorsUseCase/userUseCase/userCreate'
import { UserDto } from '@src/domain/actors/user/dto/user.dto'
import { IsPublic } from '@src/shared/decorators/is-public.decorator'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userCreateUseCase: UserCreateUseCase) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: UserDto): Promise<void> {
    try {
      await this.userCreateUseCase.execute(createUserDto)
    }catch(err){
      new HttpException('algo de errado ocorreu', 500)
    }
  }

  /* @Get()
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
  } */
}
