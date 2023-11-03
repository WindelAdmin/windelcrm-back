
import { Injectable } from '@nestjs/common';
import CompanyRepository from '../Company.repository';
import IUseCase from '@src/interfaces/IUseCase';

@Injectable()
export default class CompanyUpdateService implements IUseCase<number, void>{
  constructor(private readonly companyRepository: CompanyRepository){}

  async execute(id: number): Promise<void> {
    await this.companyRepository.delete(id)
  }
}