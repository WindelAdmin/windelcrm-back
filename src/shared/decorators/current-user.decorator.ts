import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@src/domain/user/entities/user.entity'
import { AuthRequest } from '@src/shared/dto/auth/auth-request.dto'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest<AuthRequest>()
  return request.user
})
