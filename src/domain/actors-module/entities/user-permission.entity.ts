import { Prisma } from '@prisma/client';

export default class UserPermission implements Prisma.UserPermissionUncheckedCreateInput{
  id?: number;
  userId: number;
  permissionId: number; 
}