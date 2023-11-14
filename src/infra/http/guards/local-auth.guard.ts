import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  @Inject(REQUEST) private request: Request

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  override handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw new UnauthorizedException(err?.message)
    }

    if (this.request.body?.companyId) {
      user.companyId = this.request.body.companyId
    }

    return user
  }
}
