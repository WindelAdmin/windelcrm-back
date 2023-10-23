import { Module } from '@nestjs/common'
import { UserController } from '@src/adapters/http/user/user.controller'
import { UserService } from '@src/application/user/user.service'
import { PrismaService } from '@src/infra/database/prisma/prisma.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule {}
