import { ApiProperty } from '@nestjs/swagger'

export class AuthLoginDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'E-mail do usuário'
  })
  email: string

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  password: string

  @ApiProperty({ example: 1, description: 'Sub-Empresa que o usuário quer se conectar' })
  companyId?: string
}
