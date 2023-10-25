import { Module } from '@nestjs/common'
import { UserController } from '@src/adapters/controllers/user/user.controller'
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaAdapter],
  exports: [UserService]
})
export class UserModule {}
