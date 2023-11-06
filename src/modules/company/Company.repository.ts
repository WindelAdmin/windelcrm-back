import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@src/interfaces/Repository.abstract'
import Company from './Company.model'

@Injectable()
export default class CompanyRepository extends AbstractRepository<Company> {
  constructor() {
    super(Prisma.ModelName.Company)
  }

  override async findAll(): Promise<Company[]> {
    return await this.prismaService.company.findMany()
  }

  async validateName(name: string): Promise<Boolean> {
    return (await this.prismaService.company.findFirst({
      where: {
        name
      }
    }))
      ? true
      : false
  }

  async validateCfpCnpj(cpfCnpj: string): Promise<Boolean> {
    return (await this.prismaService.company.findFirst({
      where: {
        cpfCnpj
      }
    }))
      ? true
      : false
  }

  async validateEmail(email: string): Promise<Boolean> {
    return (await this.prismaService.company.findFirst({
      where: {
        email
      }
    }))
      ? true
      : false
  }
}
