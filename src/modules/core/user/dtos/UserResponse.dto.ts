import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
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
  @ApiPropertyOptional(UserSwaggerProperties.profilePhoto)
  profilePhoto?: string
  @ApiPropertyOptional(UserSwaggerProperties.isLogged)
  isLogged?: boolean
  @ApiPropertyOptional(UserSwaggerProperties.permissionsResponse)
  permissions?: {
    id: number
    description: string,
    type: string,
    isActive: boolean
  }[]
  @ApiPropertyOptional(UserSwaggerProperties.isActive)
  isActive?: boolean
  @ApiPropertyOptional(UserSwaggerProperties.lastAccess)
  lastAccess?: string | Date
  @ApiPropertyOptional(UserSwaggerProperties.createdAt)
  createdAt?: string | Date
  @ApiPropertyOptional(UserSwaggerProperties.updatedAt)
  updatedAt?: string | Date
}
