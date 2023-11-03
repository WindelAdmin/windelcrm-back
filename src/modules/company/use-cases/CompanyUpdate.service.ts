
import { Injectable } from '@nestjs/common';
import CompanyRepository from '../Company.repository';
import IUseCase from '@src/interfaces/IUseCase';
import CompanyUpdateDto from '../dtos/CompanyUpdate.dto'
import { Builder } from 'builder-pattern'
import CompanyModel from '../Company.model'

interface Input {
  id: number;
  data: CompanyUpdateDto
}

@Injectable()
export default class CompanyUpdateService implements IUseCase<Input, void>{
  constructor(private readonly companyRepository: CompanyRepository){}

  async execute(input: Input): Promise<void> {
    const model = Builder<CompanyModel>(input.data).build();
    await this.companyRepository.update(input.id, model)
  }
}
