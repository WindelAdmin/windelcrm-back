import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/UseCase.interface'
import CompanyRepository from '../Company.repository'
import CompanyResponseDto from '../dtos/CompanyResponse.dto'

@Injectable()
export default class CompanyFindAllService implements IUseCase<void, CompanyResponseDto[]> {
  private logger = new Logger(CompanyFindAllService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyResponseDto[]> {
    try{
    const companies = await this.companyRepository.findAll()
    return companies.map((company) => ({
        ...company,
        createdAt: company.createdAt.toISOString(),
        updatedAt: company.updatedAt?.toISOString()
      }))
    }catch(err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
