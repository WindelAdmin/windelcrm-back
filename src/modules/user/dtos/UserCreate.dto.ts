import { HttpException } from '@nestjs/common'
import { IsArray, IsEmail, IsString, Matches, MinLength, Validate } from 'class-validator'

export default class UserCreateDto {
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

  @IsArray()
  @Validate((value: {id: number}[]) => {
     if (!Array.isArray(value)) {
      return 'Deve ser um array';
    }

    for (const item of value) {
      if (typeof item !== 'object' || !('id' in item) || typeof item.id !== 'number') {
        throw new HttpException('Cada elemento deve ser um objeto com uma propriedade "id" do tipo número', 500)
      }
    }
  })
  userPermissions?: [
    {
      id: number
    }
  ]

  isActive?: boolean
  lastAccess?: string
  createAt?: string
  updatedAt?: string
}
