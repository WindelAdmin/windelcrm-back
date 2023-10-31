import { Module } from '@nestjs/common';
import { UserContext } from '@src/modules/context/UserContext';
import { EmployeeController } from './Employee.controller';
import EmployeeReposiory from './Employee.repository';
import EmployeeService from './Employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeReposiory, UserContext]
})
export default class EmployeeModule {}