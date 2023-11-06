import { ApiProperty } from '@nestjs/swagger'

export default class CompanyResponseDto {
  @ApiProperty({ example: 'Empresa Exemplo', description: 'Razão Social da Empresa' })
  name: string
  @ApiProperty({ example: 'Empresa Exemplo Fantasia', description: 'Nome fantasia da empresa' })
  fantasyName: string
  @ApiProperty({ example: '14258896000101', description: 'CPF ou CNPJ da empresa' })
  cpfCnpj: string
  @ApiProperty({ example: '99999999999', description: 'Número para contato da empresa' })
  phone?: string
  @ApiProperty({ example: 'jhon@example.com', description: 'E-mail para contato da empresa' })
  email: string
  @ApiProperty({ example: '65765000', description: 'Cep do endereço da empresa' })
  cep: string
  @ApiProperty({ example: 'Rua Jorge Fernandes', description: 'Rua do endereço da empresa' })
  street: string
  @ApiProperty({ example: '105 (ou S/N)', description: 'Número do endereço da empresa' })
  number: string
  @ApiProperty({ example: 'próximo ao hospital', description: 'Complemento do endereço da empresa (opcional)' })
  complement?: string
  @ApiProperty({ example: 'Caxias do Sul', description: 'Cidade do endereço da empresa' })
  city: string
  @ApiProperty({ example: 'RS', description: 'Unidade Federativa do endereço da empresa' })
  uf: string
  @ApiProperty({ example: '2023-05-01', description: 'Data de criação do registro' })
  createdAt: string
  @ApiProperty({ example: '2023-05-01', description: 'Data de alteração do registro' })
  updatedAt: string
}
