import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CompanySwaggerProperties } from './CompanySwaggerProperties';
import { CompanyDtoErrorMessages } from './ErrorMessages.enum';

export class CompanyDeleteDto {
  @IsNumberString()
  @IsNotEmpty({
    message: CompanyDtoErrorMessages.ID_IS_NOT_EMPTY
  })
  @ApiProperty(CompanySwaggerProperties.id)
  id: number;
}