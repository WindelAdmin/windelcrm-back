import { Module } from '@nestjs/common'

import PrismaModule from '@src/infra/persistence/Prisma.module'
import { UserContext } from '../contexts/UserContext'
import { CryptoService } from '../crypto/Crypto.service'
import { UserController } from './User.controller'
import UserRepository from './User.repository'
import UserCreateService from './use-cases/UserCreate'
import UserDeleteService from './use-cases/UserDelete'
import UserFindAllService from './use-cases/UserFindAll'
import UserFindByEmailService from './use-cases/UserFindByEmail'
import UserFindByIdService from './use-cases/UserFindById'
import UserUpdateService from './use-cases/UserUpdate'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserCreateService, UserUpdateService, UserFindAllService, UserFindByIdService, UserFindByEmailService, UserDeleteService, UserRepository, UserContext, CryptoService]
})
export class UserModule {}
