import { Prisma } from '@prisma/client';
export class User implements Prisma.UserCreateInput {
  id?: number
  email: string;
  password: string;
  name: string;
  profilePhoto?: string;
  permissions: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;
  isLogged: boolean;
  lastAccess?: string | Date;
  isActive: boolean;
  createAt: string | Date;
  updatedAt?: string | Date;
  employee?: Prisma.EmployeeCreateNestedOneWithoutUserInput;
}
