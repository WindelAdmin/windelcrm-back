import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { PermissionDtoErrorMessages } from './ErrorMessages.enum'
import { PermissionSwaggerProperties } from './SwaggerProperties'

export default class PermissionUpdateDto {
  @IsNotEmpty({ message: PermissionDtoErrorMessages.DESCRIPTION_IS_NOT_EMPTY })
  @IsString({ message: PermissionDtoErrorMessages.DESCRIPTION_IS_STRING })
  @ApiProperty(PermissionSwaggerProperties.description)
  description: string

  @IsNotEmpty({ message: PermissionDtoErrorMessages.TYPE_IS_NOT_EMPTY })
  @IsString({ message: PermissionDtoErrorMessages.TYPE_IS_STRING })
  @ApiProperty(PermissionSwaggerProperties.type)
  type: string

  @IsNotEmpty({ message: PermissionDtoErrorMessages.IS_ACTIVE_IS_NOT_EMPTY })
  @IsBoolean({ message: PermissionDtoErrorMessages.IS_ACTIVE_IS_BOOLEAN })
  @ApiProperty(PermissionSwaggerProperties.isActive)
  isActive: boolean
}