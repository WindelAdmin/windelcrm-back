import { Prisma } from '@prisma/client';

export default class Permission implements Prisma.PermissionUncheckedCreateInput{
  id?: number;
  companyId: number;
  description: string;
  type: string;
  isActive: boolean;
  userPermissions?: Prisma.UserPermissionUncheckedCreateNestedManyWithoutPermissionInput;
}