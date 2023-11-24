import { Injectable } from '@nestjs/common'
import { HttpCompanyMessages } from '@shared/http-messages/HttpCompanyMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpConflictException } from '@src/shared/exceptions/HttpConflict.exception'
import CompanyRepository from '../Company.repository'
import CompanyCreateDto from '../dtos/CompanyCreate.dto'

@Injectable()
export default class CompanyCreateService implements IUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(input: CompanyCreateDto): Promise<void> {
    if (await this.companyRepository.validateExistName(input.name)) {
      throw new HttpConflictException(HttpCompanyMessages.NAME_ALREADY_EXISTS)
    }

    if (await this.companyRepository.validateExistCfpCnpj(input.cpfCnpj)) {
      throw new HttpConflictException(HttpCompanyMessages.CPF_CNPJ_ALREADY_EXISTS)
    }

    if (await this.companyRepository.validateExistEmail(input.email)) {
      throw new HttpConflictException(HttpCompanyMessages.EMAIL_ALREADY_EXISTS)
    }

    if (await this.companyRepository.validateExistPhone(input.phone)) {
      throw new HttpConflictException(HttpCompanyMessages.PHONE_ALREADY_EXISTS)
    }

    await this.companyRepository.create(input)
  }
}
