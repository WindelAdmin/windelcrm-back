import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import AbstractController from '@src/interfaces/Controller.abstract'
import { UserCreateDto } from './dtos/UserCreate.dto'
import { UserUpdateDto } from './dtos/UserUpdate.dto'
import UserCreateService from './use-cases/UserCreate'
import UserDeleteService from './use-cases/UserDelete'
import UserFindAllService from './use-cases/UserFindAll'
import UserFindByIdService from './use-cases/UserFindById'
import UserUpdateService from './use-cases/UserUpdate'

@ApiTags('user')
@Controller()
export class UserController extends AbstractController<UserCreateDto, UserUpdateDto, any> {
  constructor(
    readonly userCreateService: UserCreateService,
    readonly userUpdateService: UserUpdateService,
    readonly userFindAllService: UserFindAllService,
    readonly userFindById: UserFindByIdService,
    readonly userDeleteService: UserDeleteService
  ) {
    super(userCreateService, userUpdateService, userDeleteService, userFindAllService, userFindById)
  }
}
