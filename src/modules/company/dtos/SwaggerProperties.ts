export const CompanySwaggerProperties = {
  id: { example: '1', description: 'Id do registro' },
  name: { example: 'Empresa Exemplo', description: 'Razão Social da Empresa' },
  fantasyName: { example: 'Empresa Exemplo Fantasia', description: 'Nome fantasia da empresa' },
  cpfCnpj: { example: '14258896000101', description: 'CPF ou CNPJ da empresa' },
  phone: { example: '99999999999', description: 'Número para contato da empresa' },
  email: { example: 'jhon@example.com', description: 'E-mail para contato da empresa' },
  cep: { example: '65765000', description: 'Cep do endereço da empresa' },
  street: { example: 'Rua Jorge Fernandes', description: 'Rua do endereço da empresa' },
  number: { example: '105 (ou S/N)', description: 'Número do endereço da empresa' },
  complement: { example: 'próximo ao hospital', description: 'Complemento do endereço da empresa (opcional)' },
  city: { example: 'Caxias do Sul', description: 'Cidade do endereço da empresa' },
  uf: { example: 'RS', description: 'Unidade Federativa do endereço da empresa' },
  isActive: { example: true, description: 'Status para ativar ou destivar a empresa do sistema' },
  createdAt: { example: '2023-01-01', description: 'Data de criação da empresa' },
  updatedAt: { example: '2023-01-02', description: 'Data de da última alteração da empresa' }
}
