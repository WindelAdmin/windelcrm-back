import { Module } from '@nestjs/common'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/User.module'

@Module({
  imports: [
    AuthModule,
    RouterModule.register([
      {
        path: 'person',
        children: [
          {
            path: 'user',
            module: UserModule
          }
        ]
      }
    ])
  ],
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
