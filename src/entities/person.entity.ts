import { Prisma } from '@prisma/client';

export default class Person implements Prisma.PersonUncheckedCreateInput {
  id?: number;
  companyId: number;
  firstName: string;
  lastname?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  createAt?: string | Date;
  updatedAt?: string | Date;
  personAddress?: Prisma.PersonAddressUncheckedCreateNestedManyWithoutPersonInput;
  employee?: Prisma.EmployeeUncheckedCreateNestedOneWithoutPersonInput;


}