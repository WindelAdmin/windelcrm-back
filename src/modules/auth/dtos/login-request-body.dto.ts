import { IsEmail, IsNumber, IsString } from 'class-validator'

export class LoginRequestBodyDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsNumber()
  companyId?: number
}
