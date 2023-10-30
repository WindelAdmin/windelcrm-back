import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';

export class Employee implements Prisma.EmployeeCreateInput {
  person: Prisma.PersonCreateNestedOneWithoutEmployeeInput;
  user: Prisma.UserCreateNestedOneWithoutEmployeeInput;
  workSchedule?: Prisma.WorkScheduleCreateNestedOneWithoutEmployeeInput;
  role: Prisma.RoleCreateNestedOneWithoutEmployeeInput;
  corporatePhone: string;
  corporateEmail: string;
  wage: string | number | Prisma.Decimal | DecimalJsLike;
}
