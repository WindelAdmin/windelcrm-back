import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '@src/application/actorsUseCase/authUseCase/auth.service'
import { UserDto } from '@src/domain/actors/user/dto/user.dto'
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
