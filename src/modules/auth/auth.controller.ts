import { Controller, Get, HttpCode, HttpStatus, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LocalAuthGuard } from 'src/infra/http/guards/local-auth.guard'
import { IsPublic } from 'src/shared/decorators/is-public.decorator'
import { CryptoService } from '../crypto/Crypto.service'
import { AuthService } from './auth.service'
import PreLoginResponseDto from './dtos/PreLoginResponse.dto'
import { AuthRequestDto } from './dtos/auth-request.dto'
import { AuthTokenResponseDto } from './dtos/auth-tokenResponse.dto'
import { UserTokenDto } from './dtos/user-token.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly cryptoService: CryptoService) {}

  @ApiTags('login')
  @ApiBody({
    description: 'Credenciais do usuário para autenticação',
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
    return await this.authService.login(req.user)
  }

  @IsPublic()
  @Get('preLogin')
  async preLogin(@Query('email') email:string, @Query('password') password:string): Promise<PreLoginResponseDto>{
    return await this.authService.preLogin(email, password);
  }
}
