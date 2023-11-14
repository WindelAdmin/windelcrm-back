import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { RegexCpfCnpj, RegexEmail, RegexPhone, RegexStringNumber } from '@src/shared/types/Regex.type'
import { IsIn, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator'
import { CompanyDtoErrorMessages } from './ErrorMessages.enum'
import { CompanySwaggerProperties } from './SwaggerProperties'

export default class CompanyCreateDto {
  @IsString({ message: CompanyDtoErrorMessages.NAME_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.NAME_IS_NOT_EMPTY })
  @ApiProperty(CompanySwaggerProperties.name)
  name: string

  @IsString({ message: CompanyDtoErrorMessages.FANTASY_NAME_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.FANTASY_NAME_IS_NOT_EMPTY })
  @ApiProperty(CompanySwaggerProperties.fantasyName)
  fantasyName: string

  @IsString()
  @IsNotEmpty({
    message: CompanyDtoErrorMessages.CPF_CNPJ_IS_NOT_EMPTY
  })
  @Matches(RegexCpfCnpj, {
    message: CompanyDtoErrorMessages.CPF_CNPJ_INVALID
  })
  @ApiProperty(CompanySwaggerProperties.cpfCnpj)
  cpfCnpj: string

  @Matches(RegexPhone, { message: CompanyDtoErrorMessages.PHONE_INVALID })
  @ApiProperty(CompanySwaggerProperties.phone)
  phone: string

  @IsString({ message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.EMAIL_IS_NOT_EMPTY })
  @Matches(RegexEmail, { message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @ApiProperty(CompanySwaggerProperties.email)
  email: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_NOT_EMPTY })
  @Matches(RegexStringNumber, { message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING_NUMBER })
  @ApiProperty(CompanySwaggerProperties.cep)
  cep: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_NOT_EMPTY })
  @ApiProperty(CompanySwaggerProperties.street)
  street: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_NOT_EMPTY })
  @ApiProperty(CompanySwaggerProperties.number)
  number: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_COMPLEMENT_IS_STRING })
  @ApiPropertyOptional(CompanySwaggerProperties.complement)
  complement?: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_NOT_EMPTY })
  @ApiProperty(CompanySwaggerProperties.city)
  city: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_NOT_EMPTY })
  @Length(2, 2, { message: CompanyDtoErrorMessages.ADDRESS_UF_MIN_MAX_LENGTH })
  @ApiProperty(CompanySwaggerProperties.uf)
  uf: string

  @IsNotEmpty({ message: CompanyDtoErrorMessages.TYPE_IS_NOT_EMPTY })
  @Length(1)
  @IsIn(['M', 'F', 'R'], { message: CompanyDtoErrorMessages.TYPE_IS_INVALID })
  @ApiProperty(CompanySwaggerProperties.type)
  type: string
}
