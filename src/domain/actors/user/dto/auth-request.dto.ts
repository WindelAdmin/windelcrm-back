import { User } from '@src/domain/actors/user/user.entity'
import { Request } from 'express'

export interface AuthRequestDto extends Request {
  user: User
}
