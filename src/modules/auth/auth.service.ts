import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UnauthorizedError } from '@src/shared/errors/unauthorized.error'
import * as bcrypt from 'bcrypt'
import UserRepository from '../person/user/User.repository'
import { UserDto } from '../person/user/dtos/User.dto'
import { AuthUserDto } from './dtos/auth-request.dto'
import { UserPayloadDto } from './dtos/user-payload.dto'
import { UserTokenDto } from './dtos/user-token.dto'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private userRepository: UserRepository) {}

  async login(user: AuthUserDto): Promise<UserTokenDto> {
    const payload: UserPayloadDto = {
      userId: user.id,
      email: user.email,
      name: user.name,
      companyId: user.companyId
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email) as UserDto

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
