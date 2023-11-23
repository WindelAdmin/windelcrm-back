import { Module } from '@nestjs/common';
import PersonController from './Person.controller';
import { EmployeeModule } from './employee/Employee.module';

@Module({
  imports: [EmployeeModule],
  controllers: [PersonController]
})
export class PersonModule {}