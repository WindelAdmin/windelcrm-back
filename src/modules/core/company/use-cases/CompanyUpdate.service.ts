import { Injectable, Logger } from '@nestjs/common'
import { HttpCompanyMessages } from '@shared/http-messages/HttpCompanyMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpConflictException } from '@src/shared/exceptions/HttpConflict.exception'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import CompanyRepository from '../Company.repository'
import CompanyUpdateDto from '../dtos/CompanyUpdate.dto'
@Injectable()
export default class CompanyUpdateService implements IUseCase {
  private logger = new Logger(CompanyUpdateService.name)
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number, data: CompanyUpdateDto): Promise<void> {
    if (!(await this.companyRepository.validateExistId(id))) {
      throw new HttpNotFoundException(HttpCompanyMessages.ID_NOT_EXIST)
    }

    if (data.email && (await this.companyRepository.validateExistEmail(data.email))) {
      throw new HttpConflictException(HttpCompanyMessages.EMAIL_DUPLICATED)
    }

    if (data.phone && (await this.companyRepository.validateExistPhone(data.phone))) {
      throw new HttpConflictException(HttpCompanyMessages.PHONE_DUPLICATED)
    }

    await this.companyRepository.update(id, data)
  }
}
