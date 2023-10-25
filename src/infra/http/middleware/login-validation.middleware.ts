import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common'
import { LoginRequestBodyDto } from '@src/domain/actors/user/dto/login-request-body.dto'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body

    const loginRequestBody = new LoginRequestBodyDto()
    loginRequestBody.email = body.email
    loginRequestBody.password = body.password

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
