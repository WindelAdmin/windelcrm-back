export enum UserDtoErrorMessages {
  ID_IS_NOT_EMPTY = 'Campo id é obrigatório.',
  COMPANY_ID_IS_NOT_EMPTY = 'Campo companyId é obrigatório.',
  COMPANY_ID_IS_NUMBER = 'Campo companyId precisa ser um number.',
  NAME_IS_STRING = 'Campo name precisa ser uma string.',
  NAME_IS_NOT_EMPTY = 'Campo name é obrigatório.',
  NAME_IS_NOT_WHITE_SPACE = 'Campo name não pode conter apenas espaços em brancos.',
  EMAIL_IS_NOT_EMPTY = 'Campo email é obrigatório.',
  EMAIL_IS_STRING = 'Campo email precisa ser uma string.',
  EMAIL_INVALID = 'Campo email inválido.',
  PASSWORD_IS_STRING = 'Campo password precisa ser uma string.',
  PASSWORD_TO_WEAK = 'Campo password inválido. Deve conter letras, números e caracteres especiais.',
  PASSWORD_IS_SHORT = 'Campo password muito curto.',
  PASSWORD_IS_NOT_EMPTY = 'Campo password é obrigatório.',
  PERMISSIONS_IS_NOT_EMPTY = 'Campo permissions é obrigatório e não pode ser vazio.',
  PERMISSIONS_IS_INVALID = 'O campo userPermissions deve ser um array de id (number)'
}
