import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { LoginValidationMiddleware } from 'src/infra/http/middleware/login-validation.middleware'
import { JwtStrategy } from 'src/infra/http/strategies/jwt.strategy'
import { LocalStrategy } from 'src/infra/http/strategies/local.strategy'
import PrismaModule from 'src/infra/persistence/Prisma.module'
import { CryptoService } from '../crypto/Crypto.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, CryptoService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoginValidationMiddleware).forRoutes('login')
  }
}
