import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class LoginRequestBodyDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsNumber()
  @IsOptional()
  companyId?: number
}
