export const UserSwaggerProperties = {
  id: { example: '1', description: 'Id do registro' },
  companyId: { example: '1', description: 'Id da empresa vinculada ao usuário' },
  name: { example: 'Empresa Exemplo', description: 'Nome para identificação da pessoa' },
  email: { example: 'jhon@example.com', description: 'E-mail que será usado como usuário' },
  profilePhoto: { example: 'http://google.cloud.storage/bucket/file.png', description: 'Link da foto de perfil, que ficará armazenada no Google Cloud Storage' },
  password: { example: '$hyattt@!', description: 'Senha de acesso' },
  permissions: { example: [4, 7], description: 'Permissões do usuário dentro do sistema' },
  permissionsResponse: { example: [{ id: 1, description: 'relatorio-acesso' }], description: 'Permissões do usuário dentro do sistema' },
  isLogged: { example: true, description: 'Status atual do usuário com relação ao login' },
  isActive: { example: true, description: 'Status para ativar ou destivar o usuário do sistema' },
  lastAccess: { example: '2023-11-08', description: 'Data do último acesso do usuário' },
  createdAt: { example: '2023-01-01', description: 'Data de criação do usuário' },
  updatedAt: { example: '2023-01-02', description: 'Data de da última alteração do usuário' }
}
