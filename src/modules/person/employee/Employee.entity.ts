import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';

export class Employee implements Prisma.EmployeeCreateInput {
  corporatePhone: string;
  corporateEmail: string;
  wage: string | number | Prisma.Decimal | DecimalJsLike;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  company?: Prisma.CompanyCreateNestedOneWithoutEmployeeInput;
  workSchedule?: Prisma.WorkScheduleCreateNestedOneWithoutEmployeeInput;
  person: Prisma.PersonCreateNestedOneWithoutEmployeeInput;
  user: Prisma.UserCreateNestedOneWithoutEmployeeInput;
  role: Prisma.RoleCreateNestedOneWithoutEmployeeInput;
}
