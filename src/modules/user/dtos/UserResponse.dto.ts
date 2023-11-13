import { ApiProperty } from '@nestjs/swagger'
import { UserSwaggerProperties } from './SwaggerProperties'

export class UserResponseDto {
  @ApiProperty(UserSwaggerProperties.id)
  id: number

  @ApiProperty(UserSwaggerProperties.id)
  companyId: number

  @ApiProperty(UserSwaggerProperties.email)
  email: string
  @ApiProperty(UserSwaggerProperties.name)
  name?: string

  @ApiProperty(UserSwaggerProperties.profilePhoto)
  profilePhoto?: string

  @ApiProperty(UserSwaggerProperties.isLogged)
  isLogged?: boolean

  @ApiProperty(UserSwaggerProperties.permissionsResponse)
  permissions?: {
    id: number
    description: string
  }[]

  @ApiProperty(UserSwaggerProperties.isActive)
  isActive?: boolean

  @ApiProperty(UserSwaggerProperties.lastAccess)
  lastAccess?: string | Date

  @ApiProperty(UserSwaggerProperties.createdAt)
  createdAt?: string | Date

  @ApiProperty(UserSwaggerProperties.updatedAt)
  updatedAt?: string | Date
}
