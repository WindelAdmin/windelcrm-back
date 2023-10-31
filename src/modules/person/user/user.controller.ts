import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import AbstractController from '@src/interfaces/AbstractController'
import UserRepository from '@src/repositories/user-repository'
import { CurrentUser } from '@src/shared/decorators/current-user.decorator'
import CurrentUserContext from './dtos/current-user.dto'
import { UserCreateDto } from './dtos/user-create.dto'
import UserCreateService from './use-cases/userCreate'
import UserService from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController extends AbstractController<UserService, UserRepository> {
  constructor(private readonly userCreateService: UserCreateService, userService: UserService) {
    super(userService)
  }

  @Post()
  override async create(@CurrentUser() currentUser: CurrentUserContext, data: UserCreateDto): Promise<void> {
    this.userCreateService.execute({
      data: data,
      userContext: currentUser
    })
  }
}
