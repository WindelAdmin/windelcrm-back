import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '@src/modules/auth/auth.service'
import { UserDto } from '@src/modules/user/dtos/User.dto'

import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  validate(email: string, password: string): Promise<UserDto> {
    return this.authService.validateUser(email, password)
  }
}
