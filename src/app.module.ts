import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from '@src/application/user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './application/auth/auth.module'
import { PrismaModule } from './infra/database/prisma/prisma.module'
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard'

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
