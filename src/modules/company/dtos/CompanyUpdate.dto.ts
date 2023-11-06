import { RegexEmail, RegexStringNumber } from '@src/shared/types/Regex.type'
import { IsOptional, IsString, Length, Matches } from 'class-validator'
import { CompanyDtoErrorMessages } from './ErrorMessages'

export default class CompanyUpdateDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  fantasyName: string

  @IsOptional()
  @IsString()
  @Length(11, 14, {
    message: CompanyDtoErrorMessages.CPF_CNPJ_INVALID
  })
  cpfCnpj: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.PHONE_IS_STRING })
  @Matches(RegexStringNumber, { message: CompanyDtoErrorMessages.PHONE_IS_STRING_NUMBER })
  phone?: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @Matches(RegexEmail, { message: CompanyDtoErrorMessages.EMAIL_INVALID })
  email: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING })
  @Matches(RegexStringNumber, { message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING_NUMBER })
  cep: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_STRING })
  street: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_STRING })
  number: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_COMPLEMENT_IS_STRING })
  complement: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_STRING })
  city: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_STRING })
  @Length(2, 2, { message: CompanyDtoErrorMessages.ADDRESS_UF_MIN_MAX_LENGTH })
  uf: string
}
