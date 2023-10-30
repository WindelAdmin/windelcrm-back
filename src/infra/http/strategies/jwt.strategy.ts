import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserFromJwtDto } from '@src/modules/auth/dtos/user-from-jwt.dto'
import { UserPayloadDto } from '@src/modules/auth/dtos/user-payload.dto'
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
      id: payload.userId,
      email: payload.email,
      name: payload.name,
      companyId: payload.companyId
    }
  }
}
