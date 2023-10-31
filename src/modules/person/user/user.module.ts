import { Module } from '@nestjs/common'
import UserRepository from '@src/repositories/user-repository'
import UserCreateService from './use-cases/userCreate'
import { UserController } from './user.controller'
import UserService from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, UserCreateService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
