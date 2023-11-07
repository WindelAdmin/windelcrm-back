
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import IUseCase from '@src/interfaces/IUseCase';
import { HttpMessages } from '@src/shared/http-messages/HttpMessages';
import { Builder } from 'builder-pattern';
import CompanyModel from '../Company.model';
import CompanyRepository from '../Company.repository';
import CompanyUpdateDto from '../dtos/CompanyUpdate.dto';

interface Input {
  id: number;
  data: CompanyUpdateDto
}

@Injectable()
export default class CompanyUpdateService implements IUseCase<Input, void>{
  private logger = new Logger(CompanyUpdateService.name)
  constructor(private readonly companyRepository: CompanyRepository){}

  async execute(input: Input): Promise<void> {
    const model = Builder<CompanyModel>(input.data).build();

    if(!await this.companyRepository.validateExistById(input.id)){
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    await this.companyRepository.update(input.id, model).catch((err) => {
      this.logger.error(err)
    })
  }
}
