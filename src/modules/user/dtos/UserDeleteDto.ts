import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { UserDtoErrorMessages } from './ErrorMessages.enum';
import { UserSwaggerProperties } from './SwaggerProperties';

export class UserDeleteDto {
  @IsNumberString()
  @IsNotEmpty({
    message: UserDtoErrorMessages.ID_IS_NOT_EMPTY
  })
  @ApiProperty(UserSwaggerProperties.id)
  id: number;
}