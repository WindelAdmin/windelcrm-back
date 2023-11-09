import { Inject } from '@nestjs/common'
import { PrismaService } from '@src/infra/persistence/Prisma.service'
import { UserContext } from '@src/modules/context/UserContext'

export default abstract class AbstractRepository {
  protected entityName: string

  @Inject()
  protected readonly prismaService: PrismaService

  @Inject()
  protected readonly userContext: UserContext

  constructor(e: string) {
    this.entityName = e.charAt(0).toLowerCase() + e.slice(1)
  }

  async validateExistById(id: number): Promise<boolean> {
    return (await this.prismaService[this.entityName].findFirst({ where: { id, companyId: this.userContext.getUserContext().companyId } })) ? true : false
  }
}
