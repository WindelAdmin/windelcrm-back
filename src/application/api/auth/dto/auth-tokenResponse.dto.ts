import { ApiProperty } from '@nestjs/swagger'

export class AuthTokenResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token de acesso JWT'
  })
  access_token: string
}
