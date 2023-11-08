import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { HttpMessages } from '@src/shared/http-messages/HttpMessages'
import CompanyRepository from '../Company.repository'
import CompanyResponseDto from '../dtos/CompanyResponse.dto'

@Injectable()
export default class CompanyFindByIdService implements IUseCase<number, CompanyResponseDto> {
  private logger = new Logger(CompanyFindByIdService.name)

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<CompanyResponseDto> {
    const company = await this.companyRepository.findById(id).catch((err) => {
      this.logger.error(err)
    })

    if(!company) throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND) 
    
    return company as any
  }
}
