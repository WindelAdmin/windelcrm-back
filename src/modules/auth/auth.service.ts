import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'src/infra/persistence/Prisma.service'
import { CryptoService } from '../crypto/Crypto.service'
import { AuthUserDto } from './dtos/auth-request.dto'
import { UserPayloadDto } from './dtos/user-payload.dto'
import { UserTokenDto } from './dtos/user-token.dto'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private prismaService: PrismaService, private readonly cryptoService: CryptoService) {}

  async login(user: AuthUserDto): Promise<UserTokenDto> {
    const payload: UserPayloadDto = {
      userId: user.id,
      email: user.email,
      name: user.name,
      companyId: user.companyId
    }

    return {
      access_token: this.jwtService.sign(payload),
      data: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
        companyId: payload.companyId
      }
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: this.cryptoService.decrypt(email)
      }
    })

    const passwordDecrypted =  this.cryptoService.decrypt(user.password);

    if (user) {
      const isPasswordValid = await this.cryptoService.compare(password, passwordDecrypted)

      if (isPasswordValid) {
        return {
          id: user.id,
          companyId: user.companyId,
          email: user.email
        }
      }
    }

    throw new HttpException('Email ou senhas incorreto(s).', HttpStatus.UNAUTHORIZED)
  }
}
