import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { RouteModule } from './Route.module'
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard'
import { AuthModule } from './modules/auth/auth.module'
import CompanyModule from './modules/company/Company.module'

@Module({
  imports: [AuthModule, CompanyModule, RouteModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}