export const UserSwaggerProperties = {
  id: { example: '1', description: 'Id do registro', type: Number },
  companyId: { example: '1', description: 'Id da empresa vinculada ao usuário', type: Number },
  name: { example: 'Empresa Exemplo', description: 'Nome para identificação da pessoa', type: String},
  email: { example: 'jhon@example.com', description: 'E-mail que será usado como usuário', type: String },
  profilePhoto: { example: 'http://google.cloud.storage/bucket/file.png', description: 'Link da foto de perfil, que ficará armazenada no Google Cloud Storage', type: String },
  password: { example: '$hyattt@!', description: 'Senha de acesso', type: String },
  permissions: { example: [4, 7], description: 'Permissões do usuário dentro do sistema', type: Array<number> },
  permissionsResponse: { example: [{ id: 1, description: 'relatorio-acesso' }], description: 'Permissões do usuário dentro do sistema',type: Array},
  isLogged: { example: true, description: 'Status atual do usuário com relação ao login', type: Boolean},
  isActive: { example: true, description: 'Status para ativar ou destivar o usuário do sistema', type: Boolean },
  lastAccess: { example: '2023-11-08', description: 'Data do último acesso do usuário', type: String},
  createdAt: { example: '2023-01-01', description: 'Data de criação do usuário', type: String },
  updatedAt: { example: '2023-01-02', description: 'Data de da última alteração do usuário', type: String }
}
