import { Inject } from '@nestjs/common'
import { PrismaService } from '@src/infra/persistence/Prisma.service'
import { UserContext } from '@src/modules/context/UserContext'

export default abstract class AbstractRepository<E> {
  protected entityName: string

  @Inject()
  protected readonly prismaService: PrismaService

  @Inject()
  protected readonly userContext: UserContext

  constructor(e: string) {
    this.entityName = e.charAt(0).toLowerCase() + e.slice(1)
  }

  async create(data: E): Promise<void> {
    await this.prismaService[this.entityName].create({
      data
    })
  }

  async update(id: number, data: E): Promise<void> {
    await this.prismaService[this.entityName].update({
      where: {
        id: id
      },
      data
    })
  }

  async delete(id: number): Promise<void> {
    await this.prismaService[this.entityName].delete({
      where: {
        id
      }
    })
  }

  async findById(id: number): Promise<any> {
    return await this.prismaService[this.entityName].findUnique({
      where: {
        id
      }
    })
  }

  async findAll(): Promise<E[]> {
    return await this.prismaService[this.entityName].findMany({
      where: {
        companyId: this.userContext.getUserContext().companyId
      }
    })
  }
}
