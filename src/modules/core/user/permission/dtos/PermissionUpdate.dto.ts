import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'
import { PermissionDtoErrorMessages } from './ErrorMessages.enum'
import { PermissionSwaggerProperties } from './SwaggerProperties'

export default class PermissionUpdateDto {
  @IsString({ message: PermissionDtoErrorMessages.DESCRIPTION_IS_STRING })
  @ApiPropertyOptional(PermissionSwaggerProperties.description)
  description: string

  @IsString({ message: PermissionDtoErrorMessages.TYPE_IS_STRING })
  @ApiPropertyOptional(PermissionSwaggerProperties.type)
  type: string

  @IsString({ message: PermissionDtoErrorMessages.NAME_IS_STRING })
  @ApiPropertyOptional(PermissionSwaggerProperties.name)
  name: string

  @IsBoolean({ message: PermissionDtoErrorMessages.IS_ACTIVE_IS_BOOLEAN })
  @ApiPropertyOptional(PermissionSwaggerProperties.isActive)
  isActive: boolean
}