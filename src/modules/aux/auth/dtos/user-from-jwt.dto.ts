import UserPermissionResponseDto from '@src/modules/core/user/dtos/UserPermissionResponse.dto'

export interface UserFromJwtDto {
  id: number
  email: string
  name: string
  companyId: number,
  permissions: UserPermissionResponseDto[]
}
