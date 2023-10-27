import { Prisma } from '@prisma/client';

export default class Person implements Prisma.PersonCreateInput {
  firstName: string;
  lastname?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  createAt?: string | Date;
  updatedAt?: string | Date;
  company: Prisma.CompanyCreateNestedOneWithoutPersonsInput;
  address?: Prisma.AddressCreateNestedManyWithoutPersonInput;
  employee?: Prisma.EmployeeCreateNestedOneWithoutPersonInput;

}