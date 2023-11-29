import { Injectable, Logger } from '@nestjs/common'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'
import CompanyRepository from '../Company.repository'
import CompanyResponseDto from '../dtos/CompanyResponse.dto'

@Injectable()
export default class CompanyFindByIdService implements IUseCase {
  private logger = new Logger(CompanyFindByIdService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<CompanyResponseDto> {
    const company = await this.companyRepository.findById(id)
    if (!company) throw new HttpNotFoundException(HttpCompanyMessages.ID_NOT_EXIST)

    return company
  }
}
