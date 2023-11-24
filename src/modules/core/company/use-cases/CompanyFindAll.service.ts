import { Injectable, Logger } from '@nestjs/common'
import IUseCase from '@shared/interfaces/UseCase.interface'
import CompanyRepository from '../Company.repository'
import CompanyResponseDto from '../dtos/CompanyResponse.dto'

@Injectable()
export default class CompanyFindAllService implements IUseCase {
  private logger = new Logger(CompanyFindAllService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyResponseDto[]> {
    const companies = await this.companyRepository.findAll()
    return companies.map((company) => ({
      ...company,
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt?.toISOString()
    }))
  }
}
