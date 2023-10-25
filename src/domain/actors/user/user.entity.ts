import { Employee } from '@prisma/client'

export class User{
  id: number
  name?: string
  email: string
  password: string
  employee?: Employee
  isLogged: boolean
  isActive: boolean
  lastAccess?: Date
  createAt: Date
  updatedAt?: Date
}
