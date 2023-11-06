import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import CompanyModule from './modules/company/Company.module'
import { UserModule } from './modules/user/User.module'

@Module({
  imports: [
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
  ]
})
export class RouteModule {}
