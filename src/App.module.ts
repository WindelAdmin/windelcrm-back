import { UserContextModule } from '@modules/aux/contexts/UserContext.module'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from '@src/modules/aux/auth/auth.module'
import CompanyModule from '@src/modules/core/company/Company.module'
import { UserModule } from '@src/modules/core/user/User.module'
import { CryptoModule } from '@src/modules/generic/crypto/Crypto.module'
import { RouteModule } from './Route.module'
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard'
import PrismaModule from './infra/persistence/Prisma.module'

@Module({
  imports: [CryptoModule, AuthModule, UserContextModule, UserModule, CompanyModule, RouteModule, PrismaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
