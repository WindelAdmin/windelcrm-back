import { IsNumber } from 'class-validator';

export default class EntityBaseDto {

  @IsNumber()
  companyId: number;
}