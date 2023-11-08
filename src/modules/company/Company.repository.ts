import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@src/interfaces/Repository.abstract'
import { now } from '@src/shared/utils/DateUtils'
import CompanyCreateDto from './dtos/CompanyCreate.dto'
import CompanyUpdateDto from './dtos/CompanyUpdate.dto'

@Injectable()
export default class CompanyRepository extends AbstractRepository {
  constructor() {
    super(Prisma.ModelName.Company)
  }

  async create(data: CompanyCreateDto): Promise<void> {
    await this.prismaService.company.create({
      data
    })

    const uCxt = this.userContext.getUserContext()
    this.prismaService.audit.create({
      data: {
        userId: uCxt.id,
        userEmail: uCxt.email,
        companyId: uCxt.companyId,
        after: data as any
      }
    })
  }

  async update(id: number, data: CompanyUpdateDto): Promise<void> {
    const beforeData = await this.prismaService.company.findUnique({ where: { id } })

    await this.prismaService.user.update({
      where: {
        id: id
      },
      data: { ...data, updatedAt: now() }
    })

    const uCxt = this.userContext.getUserContext()
    this.prismaService.audit.create({
      data: {
        userId: uCxt.id,
        userEmail: uCxt.email,
        companyId: uCxt.companyId,
        after: data as any,
        before: beforeData
      }
    })
  }

  async delete(id: number): Promise<void> {
    const beforeData = await this.prismaService.company.findUnique({ where: { id } })

    await this.prismaService.company.delete({
      where: {
        id
      }
    })

    const uCxt = this.userContext.getUserContext()
    this.prismaService.audit.create({
      data: {
        userId: uCxt.id,
        userEmail: uCxt.email,
        companyId: uCxt.companyId,
        after: null,
        before: beforeData
      }
    })
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
