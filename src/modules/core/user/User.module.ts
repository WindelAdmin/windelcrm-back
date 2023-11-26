import { Module } from '@nestjs/common'

import { UserContext } from '@modules/aux/contexts/User.context'
import { UserController } from './User.controller'
import UserRepository from './User.repository'
import UserCreateService from './use-cases/UserCreate.usecase'
import UserDeleteService from './use-cases/UserDelete.usecase'
import UserFindAllService from './use-cases/UserFindAll.usecase'
import UserFindByIdService from './use-cases/UserFindById.usecase'
import UserUpdateService from './use-cases/UserUpdate.usecase'

@Module({
  controllers: [UserController],
  providers: [UserCreateService, UserUpdateService, UserFindAllService, UserFindByIdService, UserDeleteService, UserRepository, UserContext]
})
export class UserModule {}
