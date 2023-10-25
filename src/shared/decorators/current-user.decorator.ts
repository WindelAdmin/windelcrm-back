import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthRequest } from '@src/domain/auth/dto/auth/auth-request.dto'
import { User } from '@src/domain/user/user.entity'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest<AuthRequest>()
  return request.user
})
