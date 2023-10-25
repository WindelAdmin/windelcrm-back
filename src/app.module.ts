import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from '@src/application/actors-module/user-module/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './application/auth-module/auth.module'
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard'

@Module({
  imports: [UserModule, AuthModule],
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
