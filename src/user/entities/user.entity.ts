import { Prisma } from '@prisma/client'

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number
  email: string
  password: string
  name?: string
  employee?: Prisma.EmployeeUncheckedCreateNestedOneWithoutUserInput
  isActive: boolean
  lastAccess: string | Date
  permissions?: Prisma.PermissionUncheckedCreateNestedManyWithoutUserInput
  createAt: string | Date
  updatedAt: string | Date
}
