
import { Injectable, Logger } from '@nestjs/common';
import IUseCase from '@src/interfaces/IUseCase';
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
    await this.companyRepository.update(input.id, model).catch((err) => {
      this.logger.error(err)
    })
  }
}
