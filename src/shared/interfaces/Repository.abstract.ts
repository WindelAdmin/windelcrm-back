import { PrismaService } from '@infra/persistence/Prisma.service'
import { UserContext } from '@modules/aux/contexts/User.context'
import { Inject } from '@nestjs/common'

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
    return (await this.prismaService[this.entityName].findFirst({ where: { id } })) ? true : false
  }
}
