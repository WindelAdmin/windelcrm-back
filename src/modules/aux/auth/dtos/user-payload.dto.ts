export interface UserPayloadDto {
  userId: number
  email: string
  name: string,
  companyId: number
  iat?: number
  exp?: number
}
