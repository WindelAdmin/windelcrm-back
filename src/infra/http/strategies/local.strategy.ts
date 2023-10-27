import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserDto } from '@src/application/api/user/dto/user.dto'
import { AuthService } from '@src/domain/actors-module/services/auth/auth.service'
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
