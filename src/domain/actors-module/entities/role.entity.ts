import { Prisma } from '@prisma/client';

export class Role implements Prisma.RoleCreateInput {
  description: string;
  department: Prisma.DepartmentCreateNestedOneWithoutRolesInput;
}