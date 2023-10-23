import { Prisma } from '@prisma/client'

export class Employee implements Prisma.UserUncheckedCreateInput {
  id?: number
  email: string
  password: string
  name?: string
}
