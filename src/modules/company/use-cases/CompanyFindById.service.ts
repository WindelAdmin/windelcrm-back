import { Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import CompanyRepository from '../Company.repository'
import CompanyResponseDto from '../dtos/CompanyResponse.dto'

@Injectable()
export default class CompanyFindByIdService implements IUseCase<number, CompanyResponseDto> {
  private logger = new Logger(CompanyFindByIdService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<CompanyResponseDto> {
    return (await this.companyRepository.findById(id).catch((err) => {
      this.logger.error(err)
    })) as CompanyResponseDto
  }
}
