import { IsArray, IsEmail, IsNumber, IsString, Matches, MinLength } from 'class-validator'

export class UserCreateDto {
  @IsNumber()
  companyId: number

  /**
   * O e-mail será usado como usuário para acesso ao sistema.
   * @example jhon@email.com
   */
  @IsEmail()
  email: string

  /**
   * @example Hey@1234
   */
  @IsString({
    message: 'O campo senha precisa ser uma string.'
  })
  @MinLength(4, {
    message: 'Senha muito curta.'
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca.'
  })
  password: string

  /**
   * @example "Jhon Wick"
   */
  @IsString()
  name: string

  profilePhoto?: string

  isLogged?: boolean

  @IsArray({})
  userPermissions?: [
    {
      id: number
      companyId: number
      description: string
      type: string
      isActive: boolean
    }
  ]

  isActive?: boolean
  lastAccess?: string
  createAt?: string
  updatedAt?: string
}
