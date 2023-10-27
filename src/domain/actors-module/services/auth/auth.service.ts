import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserPayloadDto } from '@src/application/api/auth/dto/user-payload.dto'
import { UserTokenDto } from '@src/application/api/auth/dto/user-token.dto'
import { UserDto } from '@src/application/api/user/dto/user.dto'
import { UnauthorizedError } from '@src/shared/errors/unauthorized.error'
import * as bcrypt from 'bcrypt'
import { User } from '../../entities/user.entity'
import UserFindByEmailService from '../user/findByEmail'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userfindByEmail: UserFindByEmailService) {}

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
