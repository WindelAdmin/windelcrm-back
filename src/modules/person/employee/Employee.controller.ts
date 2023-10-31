import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import AbstractController from '@src/interfaces/AbstractController';
import EmployeeReposiory from './Employee.repository';
import EmployeeService from './Employee.service';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController extends AbstractController<EmployeeService, EmployeeReposiory> {
  constructor(service:  EmployeeService) {
    super(service, 'Funcionário')
  }
}
