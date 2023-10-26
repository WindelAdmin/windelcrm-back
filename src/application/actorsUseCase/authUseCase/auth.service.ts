import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import UserFindByEmailUseCase from '@src/application/actorsUseCase/userUseCase/findByEmail'
import { UserPayloadDto } from '@src/domain/actors/user/dto/user-payload.dto'
import { UserTokenDto } from '@src/domain/actors/user/dto/user-token.dto'
import { UserDto } from '@src/domain/actors/user/dto/user.dto'
import { User } from '@src/domain/actors/user/user.entity'
import { UnauthorizedError } from '@src/shared/errors/unauthorized.error'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userfindByEmail: UserFindByEmailUseCase) {}

  async login(user: User): Promise<UserTokenDto> {
    const payload: UserPayloadDto = {
      sub: user.id,
      email: user.email,
      name: user.name
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userfindByEmail.execute(email)

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined
        }
      }
    }

    throw new UnauthorizedError('Email address or password provided is incorrect.')
  }
}
