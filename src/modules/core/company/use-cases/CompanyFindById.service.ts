import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import CompanyRepository from '../Company.repository'
import CompanyResponseDto from '../dtos/CompanyResponse.dto'

@Injectable()
export default class CompanyFindByIdService implements IUseCase {
  private logger = new Logger(CompanyFindByIdService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<CompanyResponseDto> {
    try {
      const company = await this.companyRepository.findById(id)
      if (!company) throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)

      return {
        ...company,
        createdAt: company.createdAt.toISOString(),
        updatedAt: company.updatedAt?.toISOString()
      }
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
