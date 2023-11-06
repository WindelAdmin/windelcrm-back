import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'
import { Builder } from 'builder-pattern'
import CompanyModel from '../Company.model'
import CompanyRepository from '../Company.repository'
import CompanyCreateDto from '../dtos/CompanyCreate.dto'

@Injectable()
export default class CompanyCreateService implements IUseCase<CompanyCreateDto, void> {
  private logger = new Logger(CompanyCreateService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(input: CompanyCreateDto): Promise<void> {
    const model = Builder<CompanyModel>(input).isActive(false).build()
    
    if (await this.companyRepository.validateExistName(model.name)) {
      throw new HttpException(HttpCompanyMessages.NAME_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    if (await this.companyRepository.validateExistCfpCnpj(model.cpfCnpj)) {
      throw new HttpException(HttpCompanyMessages.CPF_CNPJ_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    if (await this.companyRepository.validateExistEmail(model.email)) {
      throw new HttpException(HttpCompanyMessages.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    if (await this.companyRepository.validateExistPhone(model.phone)) {
      throw new HttpException(HttpCompanyMessages.PHONE_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    await this.companyRepository.create(model).catch((err) => {
      this.logger.error(err)
    })
  }
}
