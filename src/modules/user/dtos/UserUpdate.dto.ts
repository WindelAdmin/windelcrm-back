import { ApiProperty } from '@nestjs/swagger'
import { IsWhitespace } from '@src/shared/decorators/IsWhiteSpace.decorator'
import { IsArray, IsOptional, IsString } from 'class-validator'
import { UserDtoErrorMessages } from './ErrorMessages.enum'
import { UserSwaggerProperties } from './SwaggerProperties'

export class UserUpdateDto {
  @IsOptional()
  @IsString({ message: UserDtoErrorMessages.NAME_IS_STRING })
  @IsWhitespace({message: UserDtoErrorMessages.NAME_IS_NOT_WHITE_SPACE})
  @ApiProperty(UserSwaggerProperties.name)
  name?: string

  @IsOptional()
  @IsArray({ message: UserDtoErrorMessages.PERMISSIONS_IS_INVALID })
  @ApiProperty(UserSwaggerProperties.permissions)
  permissions?: [number]

  @IsOptional()
  @ApiProperty(UserSwaggerProperties.isActive)
  isActive?: boolean
}
