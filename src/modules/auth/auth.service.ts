import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'src/infra/persistence/Prisma.service'
import { CryptoService } from '../crypto/Crypto.service'
import PreLoginResponseDto from './dtos/PreLoginResponse.dto'
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

    const company = await this.prismaService.company.findUnique({
      where: { id: payload.companyId }
    })

    return {
      token: this.jwtService.sign(payload),
      userData: {
        id: payload.userId,
        email: payload.email,
        name: payload.name
      },
      companyData: {
        id: company.id,
        name: company.name,
        cnpj: company.cpfCnpj
      }
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: await this.cryptoService.decrypt(email)
      }
    })

    const passwordDecrypted = await this.cryptoService.decrypt(user.password)

    if (user) {
      const isPasswordValid = await this.cryptoService.compare(passwordDecrypted, password)

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

  async preLogin(email: string, password: string): Promise<PreLoginResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: await this.cryptoService.decrypt(email)
      },
      include: {
        company: true,
        subcompanies: {
          select: {
            company: true
          }
        }
      }
    })

    if (user) {
      const passwordDecrypted = await this.cryptoService.decrypt(user.password)
      const isPasswordValid = await this.cryptoService.compare(passwordDecrypted, password)

      if (isPasswordValid) {
        return {
          companies: [
            {
              id: user.company.id,
              cnpj: user.company.cpfCnpj,
              name: user.company.name
            },
            ...user.subcompanies?.map((subcompany) => {
              return {
                id: subcompany.company.id,
                cnpj: subcompany.company.cpfCnpj,
                name: subcompany.company.name
              }
            })
          ]
        }
      }
    }

    throw new HttpException('Email ou senha incorreto(s).', HttpStatus.UNAUTHORIZED)
  }
}
