import { Module } from '@nestjs/common'
import { UserContext } from '@src/modules/context/UserContext'
import UserRepository from '@src/modules/person/user/User.repository'
import { UserController } from './User.controller'
import UserService from './User.service'
import UserCreateService from './use-cases/UserCreate'
import UserUpdateService from './use-cases/UserUpdate'

@Module({
  controllers: [UserController],
  providers: [UserService, UserCreateService, UserUpdateService, UserRepository, UserContext],
  exports: [UserService]
})
export class UserModule {}
  