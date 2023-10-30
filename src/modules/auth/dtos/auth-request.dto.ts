import { Request } from 'express'

export interface AuthUserDto {
    id: number,
    name: string
    email: string
    companyId: number
  }
export interface AuthRequestDto extends Request {
  user: AuthUserDto
}
