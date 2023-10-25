import { Prisma } from '@prisma/client'

export class Employee implements Prisma.UserUncheckedCreateInput {
  lastAccess: string | Date
  isActive: boolean
  createAt: string | Date
  updatedAt: string | Date
  employee?: Prisma.EmployeeUncheckedCreateNestedOneWithoutUserInput
  permissions?: Prisma.PermissionUncheckedCreateNestedManyWithoutUserInput
  id?: number
  email: string
  password: string
  name?: string
}
