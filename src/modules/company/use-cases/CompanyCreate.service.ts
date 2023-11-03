
import { Injectable } from '@nestjs/common';
import CompanyRepository from '../Company.repository';
import IUseCase from '@src/interfaces/IUseCase';
import CompanyCreateDto from '../dtos/CompanyCreate.dto'
import { Builder } from 'builder-pattern'
import CompanyModel from '../Company.model'

@Injectable()
export default class CompanyCreateService implements IUseCase<CompanyCreateDto, void>{
  constructor(private readonly companyRepository: CompanyRepository){}

  async execute(input: CompanyCreateDto): Promise<void> {
    const model = Builder<CompanyModel>(input).build();
    await this.companyRepository.create(model)
  }
}
