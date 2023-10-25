import { Prisma } from '@prisma/client'

export class Employee implements Prisma.EmployeeUncheckedCreateInput {
  corporatePhone: string
  corporateEmail: string
  wage: string | number
  personId: number
  userId: number
  lastAccess: string | Date
  isActive: boolean
  createAt: string | Date
  updatedAt: string | Date
  employee?: Prisma.EmployeeUncheckedCreateNestedOneWithoutUserInput
  permissions?: Prisma.PermissionUncheckedCreateNestedManyWithoutUserInput
  id?: number
}
