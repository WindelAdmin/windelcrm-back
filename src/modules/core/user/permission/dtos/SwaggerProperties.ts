export const PermissionSwaggerProperties = {
    id: { example: '1', description: 'Id do registro' },
    description: { example: 'Tela de Cadastro de Clientes', description: 'Descrição para a permissão.' },
    type: { example: 'R', description: 'Tipo pode ser R ou C, de Rota ou Componente. Controla o tipo de permissão que será validada' },
    isActive: { example: true, description: 'Status para ativar ou destivar a empresa do sistema' },
    createdAt: { example: '2023-01-01', description: 'Data de criação da permissão' },
    updatedAt: { example: '2023-01-02', description: 'Data de da última alteração da permissão' }
  }