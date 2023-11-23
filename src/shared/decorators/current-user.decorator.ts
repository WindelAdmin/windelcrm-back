import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { AuthRequestDto, AuthUserDto } from '@src/modules/aux/auth/dtos/auth-request.dto'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthUserDto => {
  const request = context.switchToHttp().getRequest<AuthRequestDto>()
  return request.user
})
