import { Module } from '@nestjs/common'
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter'
import { UserController } from '@src/application/api/user/user.controller'
import UserRepository from '../../repository/user-repository'
import UserCreateService from './userCreate'
import UserQueryService from './userQuery'

@Module({
  controllers: [UserController],
  providers: [PrismaAdapter, UserCreateService, UserRepository, UserQueryService],
  exports: [UserQueryService]
})
export class UserModule {}
