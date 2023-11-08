import { ApiProperty } from '@nestjs/swagger'
import { RegexEmail } from '@src/shared/types/Regex.type'
import { IsArray, IsNotEmpty, IsString, Matches, MinLength, Validate } from 'class-validator'
import { UserDtoErrorMessages } from './ErrorMessages.enum'
import { UserSwaggerProperties } from './SwaggerProperties'

export default class UserCreateDto {
  @ApiProperty(UserSwaggerProperties.id)
  @Validate((v) => {
    if(typeof v !== 'number'){
      return UserDtoErrorMessages.COMPANY_ID_IS_NUMBER 
    }
  })
  companyId: number
  
  @Matches(RegexEmail, { message: UserDtoErrorMessages.EMAIL_INVALID })
  @ApiProperty(UserSwaggerProperties.email)
  email: string

  @IsString({
    message: UserDtoErrorMessages.PASSWORD_IS_STRING
  })
  @MinLength(4, {
    message: UserDtoErrorMessages.PASSWORD_IS_SHORT
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: UserDtoErrorMessages.PASSWORD_TO_WEAK
  })
  @IsNotEmpty({ message: UserDtoErrorMessages. PASSWORD_IS_NOT_EMPTY })
  @ApiProperty(UserSwaggerProperties.password)
  password: string

  @IsString(
    {
      message: UserDtoErrorMessages.NAME_IS_STRING
    }
  )
  @IsNotEmpty({ message: UserDtoErrorMessages.NAME_IS_NOT_EMPTY })
  @ApiProperty(UserSwaggerProperties.name)
  name: string

  @IsArray({
     message: UserDtoErrorMessages.PERMISSIONS_IS_INVALID
  })
  @IsNotEmpty({
      message: UserDtoErrorMessages.PERMISSIONS_IS_NOT_EMPTY
  })
  @ApiProperty(UserSwaggerProperties.permissions)
  permissions?: [number]
}
