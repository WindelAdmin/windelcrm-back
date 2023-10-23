import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@src/domain/user/entities/user.entity'
import { UserService } from '@src/domain/user/user.service'
import * as bcrypt from 'bcrypt'
import { UserPayload } from '../../shared/dto/auth/user-payload.dto'
import { UserToken } from '../../shared/dto/auth/user-token.dto'
import { UnauthorizedError } from '../../shared/errors/unauthorized.error'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
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
