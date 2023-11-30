import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PermissionSwaggerProperties } from '../permission/dtos/SwaggerProperties'

export default class UserPermissionResponseDto {
  @ApiProperty(PermissionSwaggerProperties.id)
  id: number

  @ApiProperty(PermissionSwaggerProperties.type)
  type: string

  @ApiPropertyOptional(PermissionSwaggerProperties.name)
  name: string

  @ApiProperty(PermissionSwaggerProperties.description)
  description: string
}