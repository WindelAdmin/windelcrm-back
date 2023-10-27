import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthRequestDto } from '@src/application/api/auth/dto/auth-request.dto'
import { User } from '@src/domain/actors-module/entities/user.entity'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest<AuthRequestDto>()
  return request.user
})
