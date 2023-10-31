import { IsArray, IsBoolean, IsDate, IsEmail, IsNumber, IsString } from 'class-validator'

export class UserUpdateDto {
  @IsNumber()
  id: number
  /**
   * O e-mail será usado como usuário para acesso ao sistema.
   * @example jhon@email.com
   */
  @IsEmail()
  email: string

  /**
   * @example "Jhon Wick"
   */
  @IsString()
  name: string

  @IsString()
  profilePhoto?: string

  @IsBoolean()
  isLogged?: boolean

  @IsArray({})
  permissions?: [
    {
      id: number
    }
  ]

  isActive?: boolean

  @IsDate()
  lastAccess?: string | Date

  @IsDate()
  createAt?: string | Date

  @IsDate()
  updatedAt?: string | Date
}
