import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import CompanyModule from '@src/modules/core/company/Company.module'
import { UserModule } from '@src/modules/core/user/User.module'
import PermissionModule from './modules/core/user/permission/Permission.module'

@Module({
  imports: [
    RouterModule.register([
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
    ])
  ]
})
export class RouteModule {}
