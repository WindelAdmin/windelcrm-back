import { IsNumber, IsOptional, IsString } from 'class-validator'

export class LoginRequestBodyDto {
  @IsString()
  email: string

  @IsString()
  password: string

  @IsNumber()
  @IsOptional()
  companyId?: number
}
