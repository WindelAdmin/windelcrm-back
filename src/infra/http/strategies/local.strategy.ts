import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '@src/application/auth/auth.service'
import { User } from '@src/domain/user/entities/user.entity'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  validate(email: string, password: string): Promise<User> {
    return this.authService.validateUser(email, password)
  }
}
