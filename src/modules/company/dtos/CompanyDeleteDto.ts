import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CompanyDtoErrorMessages } from './ErrorMessages.enum';

export class CompanyDeleteDto {
  @IsNumberString()
  @IsNotEmpty({
    message: CompanyDtoErrorMessages.ID_IS_NOT_EMPTY
  })
  @ApiProperty({ example: '1', description: 'Id do registro a ser deletado' })
  id: number;
}