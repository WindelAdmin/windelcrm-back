import { HttpException, HttpStatus } from '@nestjs/common'

export class HttpNotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
  }
}
