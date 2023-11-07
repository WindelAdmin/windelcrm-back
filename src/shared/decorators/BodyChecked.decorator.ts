import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { isObject } from 'class-validator';

export const BodyChecked = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ParameterDecorator => {
    const request = ctx.switchToHttp().getRequest();
    if (Object.keys(request.body).length === 0 || !isObject(request.body)) {
      throw new HttpException('O corpo da requisição não inválido.', HttpStatus.BAD_REQUEST);
    }
    return request.body;
  },
);