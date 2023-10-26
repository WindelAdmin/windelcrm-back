import { Module } from '@nestjs/common'
import { UserController } from '@src/adapters/controllers/user/user.controller'
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter'
import UserFindByEmailUseCase from './findByEmail'
import UserCreateUseCase from './userCreate'

@Module({
  controllers: [UserController],
  providers: [PrismaAdapter, UserFindByEmailUseCase, UserCreateUseCase],
  exports: [UserFindByEmailUseCase]
})
export class UserModule {}
