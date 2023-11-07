import { ApiProperty } from '@nestjs/swagger'
import { RegexCpfCnpj, RegexEmail, RegexPhone, RegexStringNumber } from '@src/shared/types/Regex.type'
import { IsDefined, IsOptional, IsString, Length, Matches } from 'class-validator'
import { CompanyDtoErrorMessages } from './ErrorMessages.enum'
import { CompanySwaggerProperties } from './SwaggerProperties'


export default class CompanyUpdateDto {
  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.NAME_IS_STRING })
  @ApiProperty(CompanySwaggerProperties.name)
  name?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.FANTASY_NAME_IS_STRING })
  @ApiProperty(CompanySwaggerProperties.fantasyName)
   @IsDefined()
  fantasyName?: string

  @IsOptional()
  @IsString()
  @Matches(RegexCpfCnpj, {
    message: CompanyDtoErrorMessages.CPF_CNPJ_INVALID
  })
  @ApiProperty(CompanySwaggerProperties.cpfCnpj)
  cpfCnpj?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.PHONE_IS_STRING })
  @Matches(RegexPhone, { message: CompanyDtoErrorMessages.PHONE_INVALID })
  @ApiProperty(CompanySwaggerProperties.phone)
  phone?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @Matches(RegexEmail, { message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @ApiProperty(CompanySwaggerProperties.email)
  email?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING })
  @Matches(RegexStringNumber, { message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING_NUMBER })
  @ApiProperty(CompanySwaggerProperties.cep)
  cep?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_STRING })
  @ApiProperty(CompanySwaggerProperties.street)
  street?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_STRING })
  @ApiProperty(CompanySwaggerProperties.number)
  number?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_COMPLEMENT_IS_STRING })
  @ApiProperty(CompanySwaggerProperties.complement)
  complement?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_STRING })
  @ApiProperty(CompanySwaggerProperties.city)
  city?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_STRING })
  @Length(2, 2, { message: CompanyDtoErrorMessages.ADDRESS_UF_MIN_MAX_LENGTH })
  @ApiProperty(CompanySwaggerProperties.uf)
  uf?: string
}
