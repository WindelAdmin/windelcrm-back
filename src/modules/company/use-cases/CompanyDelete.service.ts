import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { HttpMessages } from '@src/shared/http-messages/HttpMessages'
import CompanyRepository from '../Company.repository'

@Injectable()
export default class CompanyDeleteService implements IUseCase<number, void> {
  private logger = new Logger(CompanyDeleteService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<void> {
    if (!await this.companyRepository.validateExistById(id)) {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    await this.companyRepository.delete(id).catch((err) => {
      this.logger.error(err)
    })
  }
}
