import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { PermissionDtoErrorMessages } from './ErrorMessages.enum'
import { PermissionSwaggerProperties } from './SwaggerProperties'

export default class PermissionCreateDto {
  @IsNotEmpty({ message: PermissionDtoErrorMessages.DESCRIPTION_IS_NOT_EMPTY })
  @IsString({ message: PermissionDtoErrorMessages.DESCRIPTION_IS_STRING })
  @ApiProperty(PermissionSwaggerProperties.description)
  description: string

  @IsNotEmpty({ message: PermissionDtoErrorMessages.TYPE_IS_NOT_EMPTY })
  @IsString({ message: PermissionDtoErrorMessages.TYPE_IS_STRING })
  @ApiProperty(PermissionSwaggerProperties.type)
  type: string

  @IsString({ message: PermissionDtoErrorMessages.NAME_IS_STRING })
  @ApiPropertyOptional(PermissionSwaggerProperties.name)
  name: string
}
