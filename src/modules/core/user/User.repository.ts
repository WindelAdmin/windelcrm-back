import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@shared/interfaces/Repository.abstract'
import { now } from '@shared/utils/DateUtils'
import { HttpInternalServerErrorException } from '@src/shared/exceptions/HttpInternalServerError.exception'
import UserCreateDto from './dtos/UserCreate.dto'
import { UserUpdateDto } from './dtos/UserUpdate.dto'

@Injectable()
export default class UserRepository extends AbstractRepository {
  private logger = new Logger(UserRepository.name)

  constructor() {
    super(Prisma.ModelName.User)
  }

  async create(data: UserCreateDto): Promise<void> {
    const uCxt = this.userContext.getUserContext()

    try {
      const user = await this.prismaService.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          userPermissions: {
            createMany: {
              data: data.permissions.map((p) => {
                return {
                  permissionId: p,
                  companyId: uCxt.companyId
                }
              })
            }
          },
          company: {
            connect: {
              id: uCxt.companyId
            }
          }
        }
      })

      await this.createAudit(null, { ...user, password: undefined })
    } catch (err) {
      this.logger.error(err)
      throw new HttpInternalServerErrorException(err.message)
    }
  }

  async update(id: number, data: UserUpdateDto): Promise<void> {
    const beforeData = await this.prismaService.user.findUnique({ where: { id } })

    const user = await this.prismaService.user.update({
      where: {
        id: id
      },
      data: { ...data, updatedAt: now() }
    })

    await this.createAudit({ ...beforeData, password: undefined }, { ...user, password: undefined })
  }

  async delete(id: number): Promise<void> {
    const uCxt = this.userContext.getUserContext()

    const beforeData = await this.prismaService.user.findUnique({ where: { id } })

    await this.prismaService.user.delete({
      where: {
        id,
        companyId: uCxt.companyId
      }
    })

    await this.createAudit({ ...beforeData, password: undefined }, null)
  }

  async findById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
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
  }

  async findAll() {
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
  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email
      },
      include: {
        userPermissions: {
          include: {
            permission: true
          }
        }
      }
    })
  }

  async validateExistEmail(email: string): Promise<Boolean> {
    return (await this.prismaService.user.findFirst({
      where: {
        email
      }
    }))
      ? true
      : false
  }
}
