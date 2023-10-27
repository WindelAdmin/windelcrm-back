import { User } from '@src/domain/actors-module/entities/user.entity'
import { Request } from 'express'

export interface AuthRequestDto extends Request {
  user: User
}
