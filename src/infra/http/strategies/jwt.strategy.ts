import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserFromJwtDto } from '@src/application/api/auth/dto/user-from-jwt.dto'
import { UserPayloadDto } from '@src/application/api/auth/dto/user-payload.dto'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: UserPayloadDto): Promise<UserFromJwtDto> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name
    }
  }
}
