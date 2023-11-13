import { AuthUserDto } from './auth-request.dto';

export interface UserTokenDto {
  access_token: string,
  data: AuthUserDto
}
