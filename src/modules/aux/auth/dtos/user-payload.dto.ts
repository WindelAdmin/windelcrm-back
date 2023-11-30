import UserPermissionResponseDto from '@src/modules/core/user/dtos/UserPermissionResponse.dto'

export interface UserPayloadDto {
  userId: number
  email: string
  name: string
  companyId: number
  permissions: UserPermissionResponseDto[]
  iat?: number
  exp?: number
}
