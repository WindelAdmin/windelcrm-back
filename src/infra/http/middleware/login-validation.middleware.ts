import { BadRequestException, Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { LoginRequestBodyDto } from '@src/modules/aux/auth/dtos/login-request-body.dto'
import { CryptoService } from '@src/modules/generic/crypto/Crypto.service'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  @Inject()
  private readonly cryptoService: CryptoService
  
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body;
    
    const loginRequestBody = new LoginRequestBodyDto()
    loginRequestBody.email = await this.cryptoService.decrypt(body.email)
    loginRequestBody.password = await this.cryptoService.decrypt(body.password)
    loginRequestBody.companyId = body?.companyId
    
    const validations = await validate(loginRequestBody)

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)]
        }, [])
      )
    }

    next()
  }
}
