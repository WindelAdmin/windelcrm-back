import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@shared/interfaces/Repository.abstract'
import { now } from '@shared/utils/DateUtils'
import { HttpInternalServerErrorException } from '@src/shared/exceptions/HttpInternalServerError.exception'
import CompanyCreateDto from './dtos/CompanyCreate.dto'
import CompanyUpdateDto from './dtos/CompanyUpdate.dto'

@Injectable()
export default class CompanyRepository extends AbstractRepository {
  private logger = new Logger(CompanyRepository.name)

  constructor() {
    super(Prisma.ModelName.Company)
  }

  async create(data: CompanyCreateDto): Promise<void> {
    try {
      const companyCreated = await this.prismaService.company.create({ data })
      await this.createAudit(null, companyCreated)
    } catch (err) {
      this.logger.error(err)
      throw new HttpInternalServerErrorException(err.message)
    }
  }

  async update(id: number, data: CompanyUpdateDto): Promise<void> {
    try {
      const beforeData = await this.prismaService.company.findUnique({ where: { id } })

      const companyUpdated = await this.prismaService.company.update({
        where: {
          id: id
        },
        data: { ...data, updatedAt: now() }
      })

      await this.createAudit(beforeData, companyUpdated)
    } catch (err) {
      this.logger.error(err)
      throw new HttpInternalServerErrorException(err.message)
    }
  }

  async delete(id: number): Promise<void> {
    const beforeData = await this.prismaService.company.findUnique({ where: { id } })

    await this.prismaService.company.delete({
      where: {
        id
      }
    })

    await this.createAudit(beforeData, null)
  }

  async findById(id: number) {
    return await this.prismaService.company.findUnique({
      where: {
        id
      }
    })
  }

  async findAll() {
    return await this.prismaService.company.findMany()
  }

  override async validateExistId(id: number): Promise<boolean> {
    return (await this.prismaService[this.entityName].findFirst({ where: { id } })) ? true : false
  }

  async validateExistName(name: string): Promise<Boolean> {
    return (await this.prismaService.company.findFirst({
      where: {
        name
      }
    }))
      ? true
      : false
  }

  async validateExistCfpCnpj(cpfCnpj: string): Promise<Boolean> {
    return (await this.prismaService.company.findFirst({
      where: {
        cpfCnpj
      }
    }))
      ? true
      : false
  }

  async validateExistEmail(email: string): Promise<Boolean> {
    return (await this.prismaService.company.findFirst({
      where: {
        email
      }
    }))
      ? true
      : false
  }

  async validateExistPhone(phone: string): Promise<Boolean> {
    return (await this.prismaService.company.findFirst({
      where: {
        phone
      }
    }))
      ? true
      : false
  }
}
