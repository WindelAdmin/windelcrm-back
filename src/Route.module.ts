import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import EmployeeModule from './modules/person/employee/Employee.module';
import { UserModule } from './modules/person/user/User.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'person',
        children: [
          {
          path: 'user',
          module: UserModule,
        },
        {
          path: 'employee',
          module: EmployeeModule,
        },
        ]
      }
    ]),
  ]
})
export class RouteModule {}