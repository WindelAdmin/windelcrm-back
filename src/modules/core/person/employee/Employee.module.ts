import { Module } from '@nestjs/common';
import EmployeeController from './Employee.controller';

@Module({
  imports: [EmployeeController],
})
export class EmployeeModule {}