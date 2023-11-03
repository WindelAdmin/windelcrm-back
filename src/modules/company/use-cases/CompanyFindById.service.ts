
import { Injectable } from '@nestjs/common';
import IUseCase from '@src/interfaces/IUseCase';
import CompanyRepository from '../Company.repository';
import CompanyResponseDto from '../dtos/CompanyResponse.dto';

@Injectable()
export default class CompanyFindByIdService implements IUseCase<number, CompanyResponseDto>{
  constructor(private readonly companyRepository: CompanyRepository){}

  async execute(id: number): Promise<CompanyResponseDto> {
    console.log(id);
    
    return await this.companyRepository.findById(id) as CompanyResponseDto;
  }
}
