import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from '@src/application/authContext/auth.service'
import { AuthLoginDto } from '@src/domain/actors/user/dto/auth-login.dto'
import { AuthRequestDto } from '@src/domain/actors/user/dto/auth-request.dto'
import { AuthTokenResponseDto } from '@src/domain/actors/user/dto/auth-tokenResponse.dto'
import { UserTokenDto } from '@src/domain/actors/user/dto/user-token.dto'
import { LocalAuthGuard } from '@src/infra/http/guards/local-auth.guard'
import { IsPublic } from '@src/shared/decorators/is-public.decorator'

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
  async login(@Request() req: AuthRequestDto): Promise<UserTokenDto> {
    return this.authService.login(req.user)
  }
}
