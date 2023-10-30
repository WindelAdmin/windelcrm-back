import { Prisma } from '@prisma/client';

export class Deparment implements Prisma.DepartmentUncheckedCreateInput {
  id?: number;
  companyId: number;
  description: string;
  isActive?: boolean;
  createAt?: string | Date;
  updatedAt?: string | Date;
  company: Prisma.CompanyCreateNestedOneWithoutDeparmentsInput;
  roles?: Prisma.RoleCreateNestedManyWithoutDepartmentInput;
}