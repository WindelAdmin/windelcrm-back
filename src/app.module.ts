import { Module } from '@nestjs/common'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard'
import { AuthModule } from './modules/auth/auth.module'
import CompanyModule from './modules/company/Company.module'
import { UserModule } from './modules/user/User.module'

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule
      },
      {
        path: 'company',
        module: CompanyModule
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