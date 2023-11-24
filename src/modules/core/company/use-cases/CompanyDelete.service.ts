import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import CompanyRepository from '../Company.repository'

@Injectable()
export default class CompanyDeleteService implements IUseCase {
  private logger = new Logger(CompanyDeleteService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<void> {
    if (!(await this.companyRepository.validateExistId(id))) {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    try {
      await this.companyRepository.delete(id)
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
