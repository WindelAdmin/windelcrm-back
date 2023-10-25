import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  email: string;
  password: string;
  name?: string;
  permissions: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;
  isLogged: boolean;
  lastAccess: string | Date;
  isActive: boolean;
  createAt: string | Date;
  updatedAt: string | Date;
  employee?: Prisma.EmployeeCreateNestedOneWithoutUserInput;
}
