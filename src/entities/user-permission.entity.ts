import { Prisma } from '@prisma/client';

export default class UserPermission implements Prisma.UserPermissionUncheckedCreateInput{
  companyId: number;
  id?: number;
  userId: number;
  permissionId: number; 
}