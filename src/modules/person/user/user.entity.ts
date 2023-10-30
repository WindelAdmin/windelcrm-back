import { Prisma } from '@prisma/client'

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number
  companyId: number
  email: string
  password: string
  name: string
  profilePhoto?: string
  isLogged?: boolean
  lastAccess?: string | Date
  isActive?: boolean
  createAt?: string | Date
  updatedAt?: string | Date
  employee?: Prisma.EmployeeUncheckedCreateNestedOneWithoutUserInput
  userPermissions?: Prisma.UserPermissionUncheckedCreateNestedManyWithoutUserInput
}
