import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/UseCase.interface'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'
import CompanyRepository from '../Company.repository'
import CompanyCreateDto from '../dtos/CompanyCreate.dto'

@Injectable()
export default class CompanyCreateService implements IUseCase<CompanyCreateDto, void> {
  private logger = new Logger(CompanyCreateService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(input: CompanyCreateDto): Promise<void> {
    if (await this.companyRepository.validateExistName(input.name)) {
      throw new HttpException(HttpCompanyMessages.NAME_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    if (await this.companyRepository.validateExistCfpCnpj(input.cpfCnpj)) {
      throw new HttpException(HttpCompanyMessages.CPF_CNPJ_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    if (await this.companyRepository.validateExistEmail(input.email)) {
      throw new HttpException(HttpCompanyMessages.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    if (await this.companyRepository.validateExistPhone(input.phone)) {
      throw new HttpException(HttpCompanyMessages.PHONE_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    try {
      await this.companyRepository.create(input)
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
