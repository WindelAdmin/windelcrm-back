import { RegexCpfCnpj, RegexEmail, RegexStringNumber } from '@src/shared/types/Regex.type'
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator'
import { CompanyDtoErrorMessages } from './ErrorMessages'

export default class CompanyCreateDto {
  @IsString({ message: CompanyDtoErrorMessages.NAME_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.NAME_IS_NOT_EMPTY })
  name: string

  @IsString({ message: CompanyDtoErrorMessages.FANTASY_NAME_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.FANTASY_NAME_IS_NOT_EMPTY })
  fantasyName: string

  @IsString()
  @IsNotEmpty({
    message: CompanyDtoErrorMessages.CPF_CNPJ_IS_NOT_EMPTY
  })
  @Matches(RegexCpfCnpj, {
    message: CompanyDtoErrorMessages.CPF_CNPJ_INVALID
  })
  cpfCnpj: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.PHONE_IS_STRING })
  @Matches(RegexStringNumber, { message: CompanyDtoErrorMessages.PHONE_IS_STRING_NUMBER })
  phone?: string

  @IsString({ message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.EMAIL_IS_NOT_EMPTY })
  @Matches(RegexEmail, { message: CompanyDtoErrorMessages.EMAIL_INVALID })
  email: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_NOT_EMPTY })
  @Matches(RegexStringNumber, { message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING_NUMBER })
  cep: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_NOT_EMPTY })
  street: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_NOT_EMPTY })
  number: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_COMPLEMENT_IS_STRING })
  complement?: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_NOT_EMPTY })
  city: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_NOT_EMPTY })
  @Length(2, 2, { message: CompanyDtoErrorMessages.ADDRESS_UF_MIN_MAX_LENGTH })
  uf: string
}
