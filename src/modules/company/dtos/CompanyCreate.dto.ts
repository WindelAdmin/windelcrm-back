import { ApiProperty } from '@nestjs/swagger'
import { RegexCpfCnpj, RegexEmail, RegexPhone, RegexStringNumber } from '@src/shared/types/Regex.type'
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator'
import { CompanyDtoErrorMessages } from './ErrorMessages.enum'

export default class CompanyCreateDto {
  @IsString({ message: CompanyDtoErrorMessages.NAME_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.NAME_IS_NOT_EMPTY })
  @ApiProperty({ example: 'Empresa Exemplo', description: 'Razão Social da Empresa' })
  name: string

  @IsString({ message: CompanyDtoErrorMessages.FANTASY_NAME_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.FANTASY_NAME_IS_NOT_EMPTY })
  @ApiProperty({ example: 'Empresa Exemplo Fantasia', description: 'Nome fantasia da empresa' })
  fantasyName: string

  @IsString()
  @IsNotEmpty({
    message: CompanyDtoErrorMessages.CPF_CNPJ_IS_NOT_EMPTY
  })
  @Matches(RegexCpfCnpj, {
    message: CompanyDtoErrorMessages.CPF_CNPJ_INVALID
  })
  @ApiProperty({ example: '14258896000101', description: 'CPF ou CNPJ da empresa' })
  cpfCnpj: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.PHONE_IS_STRING })
  @Matches(RegexPhone, { message: CompanyDtoErrorMessages.PHONE_INVALID })
  @ApiProperty({ example: '99999999999', description: 'Número para contato da empresa' })
  phone?: string

  @IsString({ message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.EMAIL_IS_NOT_EMPTY })
  @Matches(RegexEmail, { message: CompanyDtoErrorMessages.EMAIL_INVALID })
  @ApiProperty({ example: 'jhon@example.com', description: 'E-mail para contato da empresa' })
  email: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_NOT_EMPTY })
  @Matches(RegexStringNumber, { message: CompanyDtoErrorMessages.ADDRESS_CEP_IS_STRING_NUMBER })
  @ApiProperty({ example: '65765000', description: 'Cep do endereço da empresa' })
  cep: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_STREET_IS_NOT_EMPTY })
  @ApiProperty({ example: 'Rua Jorge Fernandes', description: 'Rua do endereço da empresa' })
  street: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_NUMBER_IS_NOT_EMPTY })
  @ApiProperty({ example: '105 (ou S/N)', description: 'Número do endereço da empresa' })
  number: string

  @IsOptional()
  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_COMPLEMENT_IS_STRING })
  @ApiProperty({ example: 'próximo ao hospital', description: 'Complemento do endereço da empresa (opcional)' })
  complement?: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_CITY_IS_NOT_EMPTY })
  @ApiProperty({ example: 'Caxias do Sul', description: 'Cidade do endereço da empresa' })
  city: string

  @IsString({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_STRING })
  @IsNotEmpty({ message: CompanyDtoErrorMessages.ADDRESS_UF_IS_NOT_EMPTY })
  @Length(2, 2, { message: CompanyDtoErrorMessages.ADDRESS_UF_MIN_MAX_LENGTH })
  @ApiProperty({ example: 'RS', description: 'Unidade Federativa do endereço da empresa' })
  uf: string
}
