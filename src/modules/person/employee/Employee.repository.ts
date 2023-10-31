import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import AbstractRepository from '@src/interfaces/AbstractRepository';

@Injectable()
export default class EmployeeReposiory extends AbstractRepository {
   constructor() {
    super(Prisma.ModelName.Employee)
  }

}