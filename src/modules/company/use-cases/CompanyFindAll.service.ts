import { Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import CompanyRepository from '../Company.repository'
import CompanyResponseDto from '../dtos/CompanyResponse.dto'

@Injectable()
export default class CompanyFindAllService implements IUseCase<void, CompanyResponseDto[]> {
  private logger = new Logger(CompanyFindAllService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyResponseDto[]> {
    return (await this.companyRepository.findAll().catch((err) => {
      this.logger.error(err)
    })) as []
  }
}
