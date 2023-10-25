import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@src/application/actors-module/user-module/user.service'

import { UserPayloadDto } from '@src/domain/actors/user/dto/user-payload.dto'
import { UserTokenDto } from '@src/domain/actors/user/dto/user-token.dto'
import { User } from '@src/domain/actors/user/user.entity'
import * as bcrypt from 'bcrypt'
import { UnauthorizedError } from '../../shared/errors/unauthorized.error'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

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

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email)

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
