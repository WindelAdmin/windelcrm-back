import { Injectable } from '@nestjs/common'
import { HttpCompanyMessages } from '@shared/http-messages/HttpCompanyMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpConflictException } from '@src/shared/exceptions/Http.exception'
import CompanyRepository from '../Company.repository'
import CompanyCreateDto from '../dtos/CompanyCreate.dto'

@Injectable()
export default class CompanyCreateService implements IUseCase<CompanyCreateDto, void> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(input: CompanyCreateDto): Promise<void> {
    if (await this.companyRepository.validateExistName(input.name)) {
      HttpConflictException(HttpCompanyMessages.NAME_ALREADY_EXISTS)
    }

    if (await this.companyRepository.validateExistCfpCnpj(input.cpfCnpj)) {
      HttpConflictException(HttpCompanyMessages.CPF_CNPJ_ALREADY_EXISTS)
    }

    if (await this.companyRepository.validateExistEmail(input.email)) {
     HttpConflictException(HttpCompanyMessages.EMAIL_ALREADY_EXISTS)
    }

    if (await this.companyRepository.validateExistPhone(input.phone)) {
      HttpConflictException(HttpCompanyMessages.PHONE_ALREADY_EXISTS)
    }

    await this.companyRepository.create(input)
  }
}
