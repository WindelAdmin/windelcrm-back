
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import IUseCase from '@src/interfaces/IUseCase';
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages';
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

    if (model.name && await this.companyRepository.validateExistName(model.name)) {
      throw new HttpException(HttpCompanyMessages.NAME_DUPLICATED, HttpStatus.CONFLICT)
    }

    if (model.cpfCnpj && await this.companyRepository.validateExistCfpCnpj(model.cpfCnpj)) {
      throw new HttpException(HttpCompanyMessages.CPF_CNPJ_DUPLICATED, HttpStatus.CONFLICT)
    }

    if (model.email && await this.companyRepository.validateExistEmail(model.email)) {
      throw new HttpException(HttpCompanyMessages.EMAIL_DUPLICATED, HttpStatus.CONFLICT)
    }

    if (model.phone && await this.companyRepository.validateExistPhone(model.phone)) {
      throw new HttpException(HttpCompanyMessages.PHONE_DUPLICATED, HttpStatus.CONFLICT)
    }

    await this.companyRepository.update(input.id, model).catch((err) => {
      this.logger.error(err)
    })
  }
}
