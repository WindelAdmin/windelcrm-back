import { Injectable } from '@nestjs/common'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'
import CompanyRepository from '../Company.repository'

@Injectable()
export default class CompanyDeleteService implements IUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<void> {
    if (!(await this.companyRepository.validateExistId(id))) {
      throw new HttpNotFoundException(HttpCompanyMessages.ID_NOT_EXIST)
    }

    await this.companyRepository.delete(id)
  }
}
