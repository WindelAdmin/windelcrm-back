import { ApiProperty } from '@nestjs/swagger'
import { PermissionSwaggerProperties } from './SwaggerProperties'

export default class PermissionResponseDto {
  @ApiProperty(PermissionSwaggerProperties.id)
  id: number
  @ApiProperty(PermissionSwaggerProperties.description)
  description: string
  @ApiProperty(PermissionSwaggerProperties.type)
  type: string
  @ApiProperty(PermissionSwaggerProperties.isActive)
  isActive: boolean
  @ApiProperty(PermissionSwaggerProperties.createdAt)
  createdAt: string | Date
  @ApiProperty(PermissionSwaggerProperties.updatedAt)
  updatedAt: string | Date
}