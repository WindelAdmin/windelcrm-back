import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { AuthUserDto } from '@src/modules/aux/auth/dtos/auth-request.dto'
import { Request } from 'express'

@Injectable()
export class UserContext {
  @Inject(REQUEST) private request: Request

  getUserContext(): AuthUserDto {
    return this.request['user'] as AuthUserDto
  }
}
