import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { UserDtoErrorMessages } from './ErrorMessages.enum'
import { UserSwaggerProperties } from './SwaggerProperties'

export class UserUpdateDto {
  @IsNotEmpty({ message: UserDtoErrorMessages.COMPANY_ID_IS_NOT_EMPTY })
  @IsNumber({ message: UserDtoErrorMessages.COMPANY_ID_IS_NUMBER })
  companyId: number

  @IsString({ message: UserDtoErrorMessages.NAME_IS_STRING })
  @IsOptional()
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
