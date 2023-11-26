import { ApiProperty } from '@nestjs/swagger'
import { IsWhitespace } from '@shared/decorators/IsWhiteSpace.decorator'
import { RegexEmail } from '@shared/types/Regex.type'
import { IsArray, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'
import { UserDtoErrorMessages } from './ErrorMessages.enum'
import { UserSwaggerProperties } from './SwaggerProperties'

export default class UserCreateDto {
  @Matches(RegexEmail, { message: UserDtoErrorMessages.EMAIL_INVALID })
  @ApiProperty(UserSwaggerProperties.email)
  email: string

  @IsString({
    message: UserDtoErrorMessages.PASSWORD_IS_STRING
  })
  @MinLength(4, {
    message: UserDtoErrorMessages.PASSWORD_IS_SHORT
  })
  @IsNotEmpty({ message: UserDtoErrorMessages.PASSWORD_IS_NOT_EMPTY })
  @ApiProperty(UserSwaggerProperties.password)
  password: string

  @IsString({ message: UserDtoErrorMessages.NAME_IS_STRING })
  @IsNotEmpty({ message: UserDtoErrorMessages.NAME_IS_NOT_EMPTY })
  @IsWhitespace({ message: UserDtoErrorMessages.NAME_IS_NOT_WHITE_SPACE })
  @ApiProperty(UserSwaggerProperties.name)
  name: string

  @IsArray({
    message: UserDtoErrorMessages.PERMISSIONS_IS_INVALID
  })
  @IsNotEmpty({
    message: UserDtoErrorMessages.PERMISSIONS_IS_NOT_EMPTY
  })
  @ApiProperty(UserSwaggerProperties.permissions)
  permissions?: number[]
}
