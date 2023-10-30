import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthRequestDto, AuthUserDto } from '@src/modules/auth/dtos/auth-request.dto'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthUserDto => {
  const request = context.switchToHttp().getRequest<AuthRequestDto>()
  return request.user
})
