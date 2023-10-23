import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from '@src/application/auth/auth.service'
import { LocalAuthGuard } from '@src/infra/http/guards/local-auth.guard'
import { IsPublic } from '@src/shared/decorators/is-public.decorator'
import { AuthLoginDto } from '@src/shared/dto/auth/auth-login.dto'
import { AuthRequest } from '@src/shared/dto/auth/auth-request.dto'
import { AuthTokenResponseDto } from '@src/shared/dto/auth/auth-tokenResponse.dto'
import { UserToken } from '@src/shared/dto/auth/user-token.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('login')
  @ApiBody({
    description: 'Credenciais do usuário para autenticação',
    type: AuthLoginDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Autenticação bem-sucedida',
    type: AuthTokenResponseDto
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciais inválidas'
  })
  @ApiBearerAuth()
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest): Promise<UserToken> {
    return this.authService.login(req.user)
  }
}
