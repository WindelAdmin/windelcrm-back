import { Module } from '@nestjs/common'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard'
import { AuthModule } from './modules/auth/auth.module'
import EmployeeModule from './modules/person/employee/Employee.module'
import { UserModule } from './modules/person/user/User.module'

@Module({
  imports: [
    AuthModule,
    EmployeeModule,
    RouterModule.register([
      {
        path: 'person',
        children: [
          {
          path: 'user',
          module: UserModule,
        },
        ]
      }
    ]),
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
