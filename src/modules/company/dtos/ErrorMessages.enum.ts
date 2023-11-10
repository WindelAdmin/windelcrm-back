export enum CompanyDtoErrorMessages {
  ID_IS_NOT_EMPTY = 'Campo id é obrigatório.',
  NAME_IS_STRING = 'Campo name precisa ser uma string.',
  NAME_IS_NOT_EMPTY = 'Campo name é obrigatório.',
  FANTASY_NAME_IS_STRING = 'Campo name precisa ser uma string.',
  FANTASY_NAME_IS_NOT_EMPTY = 'Campo name é obrigatório.',
  EMAIL_IS_NOT_EMPTY = 'Campo email é obrigatório.',
  EMAIL_IS_STRING = 'Campo email precisa ser uma string.',
  EMAIL_INVALID = 'Campo email inválido.',
  PHONE_IS_STRING = 'Campo phone precisa ser uma string.',
  PHONE_INVALID = 'Campo phone inválido.',
  CPF_CNPJ_IS_NOT_EMPTY = 'Campo cpfCnpj é obrigatório.',
  CPF_CNPJ_INVALID = 'Campo cpfCnpj inválido.',
  CNPJ_IS_STRING = 'Campo cnpj precisa ser uma string.',
  TYPE_IS_NOT_EMPTY = 'Campo type é obrigatório.',
  TYPE_IS_INVALID = 'Campo type precisa ser M, F ou R.',
  ADDRESS_CEP_IS_NOT_EMPTY = 'Campo cep é obrigatório.',
  ADDRESS_CEP_IS_STRING = 'Campo cep precisa ser uma string.',
  ADDRESS_CEP_IS_STRING_NUMBER = 'Campo cep deve conter apenas números.',
  ADDRESS_STREET_IS_NOT_EMPTY = 'Campo street é obrigatório.',
  ADDRESS_STREET_IS_STRING = 'Campo street precisa ser uma string.',
  ADDRESS_NUMBER_IS_NOT_EMPTY = 'Campo number é obrigatório.',
  ADDRESS_NUMBER_IS_STRING = 'Campo number precisa ser uma string.',
  ADDRESS_COMPLEMENT_IS_STRING = 'Campo complement precisa ser uma string.',
  ADDRESS_CITY_IS_STRING = 'Campo city precisa ser uma string.',
  ADDRESS_CITY_IS_NOT_EMPTY = 'Campo city é obrigatório.',
  ADDRESS_UF_IS_NOT_EMPTY = 'Campo uf é obrigatório.',
  ADDRESS_UF_IS_STRING = 'Campo uf precisa ser uma string.',
  ADDRESS_UF_MIN_MAX_LENGTH = 'Campo uf precisa ter no mínimo e no máximo duas letras.'
}
