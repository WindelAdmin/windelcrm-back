import UserPermissionResponseDto from '@src/modules/core/user/dtos/UserPermissionResponse.dto'
import { Request } from 'express'

export interface AuthUserDto {
    id: number,
    name: string
    email: string
    companyId: number,
    permissions: UserPermissionResponseDto[]
  }
export interface AuthRequestDto extends Request {
  user: AuthUserDto
}
