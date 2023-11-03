
import { Injectable } from '@nestjs/common';
import CompanyRepository from '../Company.repository';
import IUseCase from '@src/interfaces/IUseCase';
import CompanyResponseDto from '../dtos/CompanyResponse.dto'

@Injectable()
export default class CompanyFindAllService implements IUseCase<void, CompanyResponseDto[]>{
  constructor(private readonly companyRepository: CompanyRepository){}

  async execute(): Promise<CompanyResponseDto[]> {
    return await this.companyRepository.findAll() as CompanyResponseDto[]
  }
}
