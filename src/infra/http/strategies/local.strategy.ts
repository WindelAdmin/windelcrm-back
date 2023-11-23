import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '@src/modules/aux/auth/auth.service'
import { UserResponseDto } from '@src/modules/core/user/dtos/UserResponse.dto'

import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  validate(email: string, password: string): Promise<UserResponseDto> {
    return this.authService.validateUser(email, password)
  }
}
