import { ApiPropertyOptional } from '@nestjs/swagger'
import { RegexCep, RegexEmail, RegexPhone } from '@src/shared/types/Regex.type'
import { IsIn, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator'
import { CompanyDtoErrorMessages } from './ErrorMessages.enum'
import { CompanySwaggerProperties } from './SwaggerProperties'

export default class CompanyUpdateDto {
  @IsOptional()
  @Matches(RegexPhone, { message: CompanyDtoErrorMessages.PHONE_INVALID })
  @ApiPropertyOptional(CompanySwaggerProperties.phone)
  phone?: string

  @IsOptional()
  @Matches(RegexEmail, { message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @ApiPropertyOptional(CompanySwaggerProperties.email)
  email?: string

  @IsOptional()
  @Matches(RegexCep, { message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_INVALID })
  @ApiPropertyOptional(CompanySwaggerProperties.cep)
  cep?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_STRING })
  @ApiPropertyOptional(CompanySwaggerProperties.street)
  street?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_STRING })
  @ApiPropertyOptional(CompanySwaggerProperties.number)
  number?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_COMPLEMENT_IS_STRING })
  @ApiPropertyOptional(CompanySwaggerProperties.complement)
  complement?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_STRING })
  @ApiPropertyOptional(CompanySwaggerProperties.city)
  city?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_STRING })
  @Length(2, 2, { message: CompanyDtoErrorMessages.ADDRESS_UF_MIN_MAX_LENGTH })
  @ApiPropertyOptional(CompanySwaggerProperties.uf)
  uf?: string

  @IsNotEmpty({ message: CompanyDtoErrorMessages.TYPE_IS_NOT_EMPTY })
  @IsOptional()
  @Length(1)
  @IsIn(['M', 'F', 'R'], { message: CompanyDtoErrorMessages.TYPE_IS_INVALID })
  @ApiPropertyOptional(CompanySwaggerProperties.type)
  type?: string
}
