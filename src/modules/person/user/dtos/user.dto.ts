import { IsArray, IsBoolean, IsDate, IsEmail, IsNumber, IsString, Matches, MinLength } from 'class-validator';

export class UserDto{

  @IsNumber()
  companyId: number;

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

  @IsString()
  profilePhoto?: string

  @IsBoolean()
  isLogged?: boolean

  @IsArray({})
  permissions?: [{
    id: number,
    companyId: number,
    description: string,
    type: string,
    isActive: boolean,
  }]

  isActive?: boolean
  
  @IsDate()
  lastAccess?: string | Date

  @IsDate()
  createAt?: string | Date

  @IsDate()
  updatedAt?: string | Date
}
