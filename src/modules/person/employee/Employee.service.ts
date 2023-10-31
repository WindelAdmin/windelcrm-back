import { Injectable } from '@nestjs/common';
import AbstractService from '@src/interfaces/AbstractService';
import { UserContext } from '@src/modules/context/UserContext';
import EmployeeReposiory from './Employee.repository';

@Injectable()
export default class EmployeeService extends AbstractService<EmployeeReposiory>{
  constructor(readonly employeeRepository: EmployeeReposiory, userContext: UserContext) {
    super(employeeRepository, userContext)
  }
}