
  import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { PermissionDtoErrorMessages } from './ErrorMessages.enum';
  export default class PermissionDeleteDto {
    @IsNumberString()
    @IsNotEmpty({
      message: PermissionDtoErrorMessages.ID_IS_NOT_EMPTY
    })
    @ApiProperty({ example: 1, description: 'Id do registro a ser deletado' })
    id: number;
  }