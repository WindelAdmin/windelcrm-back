import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class AuthLoginDto {
  @ApiProperty({ example: 'usuario@example.com', description: 'E-mail do usuário' })
  email: string

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  password: string

  @ApiPropertyOptional({ example: 1, description:   'Sub-Empresa que o usuário quer se conectar' })
  companyId?: number
}
