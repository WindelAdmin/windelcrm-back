import { Module } from '@nestjs/common'

import { UserContext } from '@modules/aux/contexts/User.context'
import { UserController } from './User.controller'
import UserRepository from './User.repository'
import UserCreateService from './use-cases/UserCreate.service'
import UserDeleteService from './use-cases/UserDelete.service'
import UserFindAllService from './use-cases/UserFindAll.service'
import UserFindByIdService from './use-cases/UserFindById.service'
import UserUpdateService from './use-cases/UserUpdate.service'

@Module({
  controllers: [UserController],
  providers: [UserCreateService, UserUpdateService, UserFindAllService, UserFindByIdService, UserDeleteService, UserRepository, UserContext]
})
export class UserModule {}
