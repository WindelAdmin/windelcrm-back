import { Module } from '@nestjs/common'
import PrismaModule from '@src/infra/persistence/Prisma.module'

import { UserContext } from '../../context/UserContext'
import { UserController } from './User.controller'
import UserRepository from './User.repository'
import UserCreateService from './use-cases/UserCreate'
import UserDeleteService from './use-cases/UserDelete'
import UserFindByIdService from './use-cases/UserFindById'
import UserUpdateService from './use-cases/UserUpdate'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserCreateService,
    UserUpdateService,
    UserFindByIdService,
    UserDeleteService,
    UserRepository,
    UserContext
  ],
  exports: [UserRepository]
})
export class UserModule {}
