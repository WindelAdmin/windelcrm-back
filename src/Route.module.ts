import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { UserModule } from './modules/user/User.module'

@Module({
  imports: [
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
  ]
})
export class RouteModule {}
