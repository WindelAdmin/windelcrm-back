
  import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@shared/interfaces/Repository.abstract'
import { now } from '@src/shared/utils/DateUtils'
import PermissionCreateDto from './dtos/PermissionCreate.dto'
import PermissionUpdateDto from './dtos/PermissionUpdate.dto'

  @Injectable()
  export default class  PermissionRepository extends AbstractRepository {
    constructor() {
    super(Prisma.ModelName.Permission)
    }

    async create(data: PermissionCreateDto): Promise<void> {
    const permissionCreated = await this.prismaService.permission.create({
      data: {
        ...data,
        isActive: true
      }
    })

    await this.createAudit(null, permissionCreated)
  }

  async update(id: number, data: PermissionUpdateDto): Promise<void> {
    const beforeData = await this.prismaService.permission.findUnique({ where: { id } })

    const permissionUpdated = await this.prismaService.permission.update({
      where: {
        id: id
      },
      data: { ...data, updatedAt: now() }
    })

    await this.createAudit(beforeData, permissionUpdated)
  }

  async delete(id: number): Promise<void> {
    const beforeData = await this.prismaService.permission.findUnique({ where: { id } })

    await this.prismaService.permission.delete({
      where: {
        id
      }
    })

    await this.createAudit(beforeData, null)
  }

  async findById(id: number) {
    return await this.prismaService.permission.findUnique({
      where: {
        id
      }
    })
  }

  async findAll() {
    return await this.prismaService.permission.findMany()
  }
  }
  