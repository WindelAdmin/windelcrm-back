import { AuthUserDto } from './auth-request.dto';

export interface UserTokenDto {
  token: string,
  data: AuthUserDto
}
