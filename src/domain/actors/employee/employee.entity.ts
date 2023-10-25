import { User } from '../user/user.entity'

export class Employee {
  id: number
  corporatePhone: string
  corporateEmail: string
  wage: number
  person: number
  user: User
  lastAccess?: Date
  isActive: boolean
  createAt: Date
  updatedAt?: Date
}
