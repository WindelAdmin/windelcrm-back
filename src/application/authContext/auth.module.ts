import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from '@src/adapters/controllers/auth/auth.controller'
import { UserModule } from '@src/application/actorsContext/user-module/user.module'
import { LoginValidationMiddleware } from '@src/infra/http/middleware/login-validation.middleware'
import { JwtStrategy } from '@src/infra/http/strategies/jwt.strategy'
import { LocalStrategy } from '@src/infra/http/strategies/local.strategy'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoginValidationMiddleware).forRoutes('login')
  }
}
