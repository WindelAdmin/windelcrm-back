
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import IUseCase from '@src/interfaces/IUseCase';
import { Builder } from 'builder-pattern';
import CompanyModel from '../Company.model';
import CompanyRepository from '../Company.repository';
import CompanyCreateDto from '../dtos/CompanyCreate.dto';

@Injectable()
export default class CompanyCreateService implements IUseCase<CompanyCreateDto, void>{
  constructor(private readonly companyRepository: CompanyRepository){}

  async execute(input: CompanyCreateDto): Promise<void> {
    const model = Builder<CompanyModel>(input).build();

    if(this.companyRepository.validateName(model.name)){
      throw new HttpException("Nome da Empresa já existe na base de dados.", HttpStatus.CONFLICT)
    }
    await this.companyRepository.create(model)
  }
}
