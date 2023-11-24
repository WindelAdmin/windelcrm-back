export enum HttpCompanyMessages {
  ID_NOT_EXIST = 'Id informado não existe na base de dados.',
  NAME_ALREADY_EXISTS = 'Nome da empresa já existe na base de dados.',
  CPF_CNPJ_ALREADY_EXISTS = 'CPF ou CNPJ da empresa já existe na base de dados.',
  EMAIL_ALREADY_EXISTS = 'E-mail da empresa já existe na base de dados.',
  PHONE_ALREADY_EXISTS = 'Número de telefone da empresa já existe na base de dados.',
  NAME_DUPLICATED = 'Não é possível atualizar o Nome da empresa, dados duplicados.',
  CPF_CNPJ_DUPLICATED = 'Não é possível atualizar o CPF ou CNPJ da empresa, dados duplicados.',
  EMAIL_DUPLICATED = 'Não é possível atualizar o E-mail da empresa, dados duplicados.',
  PHONE_DUPLICATED = 'Não é possível atualizar o Número de telefone da empresa, dados duplicados.'
}
