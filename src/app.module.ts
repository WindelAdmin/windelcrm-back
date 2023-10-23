import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './application/auth/auth.module'
import { UserModule } from './domain/user/user.module'
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
