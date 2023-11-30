import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PermissionSwaggerProperties } from './SwaggerProperties'

export default class PermissionResponseDto {
  @ApiProperty(PermissionSwaggerProperties.id)
  id: number

  @ApiProperty(PermissionSwaggerProperties.description)
  description: string

  @ApiProperty(PermissionSwaggerProperties.type)
  type: string

  @ApiPropertyOptional(PermissionSwaggerProperties.name)
  name: string

  @ApiProperty(PermissionSwaggerProperties.isActive)
  isActive?: boolean

  @ApiPropertyOptional(PermissionSwaggerProperties.createdAt)
  createdAt?: string | Date

  @ApiPropertyOptional(PermissionSwaggerProperties.updatedAt)
  updatedAt?: string | Date
}
