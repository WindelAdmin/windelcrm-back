import { Inject } from '@nestjs/common'
import { PrismaService } from '@src/infra/persistence/Prisma.service'
import { UserContext } from '@src/modules/contexts/UserContext'

export default abstract class AbstractRepository {
  protected entityName: string

  @Inject()
  protected readonly prismaService: PrismaService

  @Inject()
  protected readonly userContext: UserContext

  constructor(e: string) {
    this.entityName = e.charAt(0).toLowerCase() + e.slice(1)
  }

  async createAudit(before: any, after: any) {
    const uCxt = this.userContext.getUserContext()

    this.prismaService.audit.create({
      data: {
        userId: uCxt.id,
        userEmail: uCxt.email,
        companyId: uCxt.companyId,
        before: before,
        after: after
      }
    })
  }

  async validateExistId(id: number): Promise<boolean> {
    return (await this.prismaService[this.entityName].findFirst({ where: { id, companyId: this.userContext.getUserContext().companyId } })) ? true : false
  }
}
