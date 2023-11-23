import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpCompanyMessages } from '@shared/http-messages/HttpCompanyMessages'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import CompanyRepository from '../Company.repository'
import CompanyUpdateDto from '../dtos/CompanyUpdate.dto'

interface Input {
  id: number
  data: CompanyUpdateDto
}

@Injectable()
export default class CompanyUpdateService implements IUseCase<Input, void> {
  private logger = new Logger(CompanyUpdateService.name)
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(input: Input): Promise<void> {
    if (!(await this.companyRepository.validateExistId(input.id))) {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    if (input.data.email && (await this.companyRepository.validateExistEmail(input.data.email))) {
      throw new HttpException(HttpCompanyMessages.EMAIL_DUPLICATED, HttpStatus.CONFLICT)
    }

    if (input.data.phone && (await this.companyRepository.validateExistPhone(input.data.phone))) {
      throw new HttpException(HttpCompanyMessages.PHONE_DUPLICATED, HttpStatus.CONFLICT)
    }

    try {
      await this.companyRepository.update(input.id, input.data)
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
