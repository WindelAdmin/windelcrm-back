import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import AbstractController from '@src/interfaces/AbstractController'
import UserRepository from '@src/repositories/user-repository'
import UserService from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController extends AbstractController<UserService, UserRepository>{
  constructor(userService: UserService){
    super(userService)
  }
}
