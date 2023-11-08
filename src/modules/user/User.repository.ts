import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@src/interfaces/Repository.abstract'
import { now } from '@src/shared/utils/DateUtils'
import UserCreateDto from './dtos/UserCreate.dto'
import { UserUpdateDto } from './dtos/UserUpdate.dto'

@Injectable()
export default class UserRepository extends AbstractRepository{
  constructor(){
    super(Prisma.ModelName.User)
  }

  async create(data: UserCreateDto): Promise<void> {
    await this.prismaService.user.create({
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

  async update(id: number, data: UserUpdateDto): Promise<void> {
    const beforeData = await this.prismaService.user.findUnique({ where: { id } })

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
    const beforeData = await this.prismaService.user.findUnique({ where: {id} })

    await this.prismaService.user.delete({
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

  async findById(id: number){
    return await this.prismaService.user.findUnique({
      where: {
        id
      }
    })
  }

  async findAll(){
    const users = await this.prismaService.user.findMany({
      where: {
        companyId: this.userContext.getUserContext().companyId
      },
      include: {
        userPermissions: {
          include: {
            permission: true
          }
        }
      }
    })

    return users.map((user) => {
      return {
        ...user,
        permissions: user.userPermissions.map((uP) => uP.permission)
      }
    })
  }
  async findByEmail(email: string){
    return await this.prismaService.user.findUnique({
      where: {
        email
      }
    })
  }
}
