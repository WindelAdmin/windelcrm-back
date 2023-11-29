import { UserContextModule } from '@modules/aux/contexts/UserContext.module'
import { Module } from '@nestjs/common'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { AuthModule } from '@src/modules/aux/auth/auth.module'
import CompanyModule from '@src/modules/core/company/Company.module'
import { UserModule } from '@src/modules/core/user/User.module'
import { CryptoModule } from '@src/modules/generic/crypto/Crypto.module'
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard'
import PrismaModule from './infra/persistence/Prisma.module'
import PermissionModule from './modules/core/user/permission/Permission.module'

@Module({
  imports: [CryptoModule, AuthModule, UserContextModule, UserModule, CompanyModule, PrismaModule, RouterModule.register([
      {
        path: 'user',
        module: UserModule,
        children: [
          {
            path: 'permission',
            module: PermissionModule
          }
        ]
      },
      {
        path: 'company',
        module: CompanyModule
      },
      {
        path: 'person',
        children: [
          {
            path: 'employee'
          }
        ]
      }
    ])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
