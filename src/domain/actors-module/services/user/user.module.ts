import { Module } from '@nestjs/common'
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter'
import { UserController } from '@src/application/api/user/user.controller'
import UserRepository from '../../repository/user-repository'
import UserFindByEmailService from './findByEmail'
import UserCreateService from './userCreate'

@Module({
  controllers: [UserController],
  providers: [PrismaAdapter, UserFindByEmailService, UserCreateService, UserRepository],
  exports: [UserFindByEmailService]
})
export class UserModule {}
