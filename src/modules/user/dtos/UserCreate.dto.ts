import { IsArray, IsEmail, IsNumber, IsString, Matches, MinLength } from 'class-validator'

export default class UserCreateDto {
  @IsNumber()
  companyId: number
  @IsEmail()
  email: string

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

  @IsString()
  name: string

  profilePhoto?: string

  isLogged?: boolean

  @IsArray({
    message: 'O campo userPermissions deve ser um array de id (number)',
  })
  userPermissions?: [number]

  isActive?: boolean
  lastAccess?: string
  createAt?: string
  updatedAt?: string
}
