import UserPermissionResponseDto from '@src/modules/core/user/dtos/UserPermissionResponse.dto'

export interface UserTokenDto {
  token: string,
  userData: {
    id: number,
    name: string,
    email: string
    permissions: UserPermissionResponseDto[]
  },
  companyData: {
    id: number,
    name: string,
    cnpj: string
  }
}
