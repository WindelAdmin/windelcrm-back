import { HttpException, HttpStatus } from '@nestjs/common';

export function HttpConflictException(message: string) {
  throw new HttpException(
    message,
    HttpStatus.CONFLICT
  );
}

export function HttpNotFoundException(message: string) {
  throw new HttpException(
    message,
    HttpStatus.NOT_FOUND
  );
}

export function HttpUnauthorizedException(message: string) {
  throw new HttpException(
    message,
    HttpStatus.UNAUTHORIZED
  );
}

export function HttpNoContentException(message: string) {
  throw new HttpException(
    message,
    HttpStatus.NOT_FOUND
  );
}

export function HttpInternalServerErrorException(message: string) {
  throw new HttpException(
    message,
    HttpStatus.INTERNAL_SERVER_ERROR
  );
}