import { Logger } from '@nestjs/common'
import { PrismaService } from '@src/infra/persistence/prisma-service'
import CurrentUserContext from '@src/modules/person/user/dtos/current-user.dto'
import { now } from '@src/shared/utils/Date'

export default abstract class AbstractRepository {
  protected entityName: string
  protected prismaService: PrismaService
  private readonly logger = new Logger(AbstractRepository.name)

  constructor(entityName: string) {
    if (!entityName) {
      throw new Error('O contexto da entidade não foi definido no construtor.')
    }

    this.entityName = entityName.toLocaleLowerCase()
    this.prismaService = new PrismaService()
  }

  async create(data: any, userContext?: CurrentUserContext): Promise<any> {
    try {
      const resultData = await this.prismaService[this.entityName].create({
        data
      })

      this.logger.log(`CREATE: ${JSON.stringify(data)}`)

      if (userContext) {
        await this.prismaService.audit.create({
          data: {
            userId: userContext.id,
            userEmail: userContext.email,
            companyId: userContext.companyId,
            after: resultData
          }
        })
      }
    } catch (err) {
      this.logger.error(err)
    }
  }

  async update(companyId: number, data: any, userContext?: CurrentUserContext): Promise<void> {
    const resultData = await this.prismaService[this.entityName].update({
      where: {
        companyId: companyId,
        id: data.id
      },
      data: { ...data, updatedAt: now() }
    })

    this.logger.log(`[UPDATE]: \n
        [BEFORE]: ${JSON.stringify(data)}
        [AFTER]: ${JSON.stringify(resultData)}
      `)

    if (userContext) {
      await this.prismaService.audit.create({
        data: {
          userId: userContext.id,
          userEmail: userContext.email,
          companyId: userContext.companyId,
          before: data,
          after: resultData
        }
      })
    }
  }

  async delete(id: number): Promise<any> {
    try {
      this.prismaService[this.entityName].delete({
        where: {
          id: id
        }
      })
    } catch (err) {
      this.logger.error(err)
    }
  }

  async findById(id: number, ignoreFields?: string[]): Promise<any> {
    const result = await this.prismaService[this.entityName].findUnique({
      where: {
        id
      }
    })

    if (result) {
      this.resolveIgnoredFields(result, ignoreFields)
    }

    return result
  }

  async findAll(companyId: number, ignoreFields?: string[]): Promise<any[]> {
    const results = await this.prismaService[this.entityName].findMany({
      where: {
        companyId
      }
    })

    if (results?.length > 0 && ignoreFields?.length > 0) {
      await results.forEach((element) => {
        this.resolveIgnoredFields(element, ignoreFields)
      })
    }

    return results
  }

  async findOneByField(field: string, value: any, companyId: number, ignoreFields?: string[]): Promise<any> {
    const result = await this.prismaService[this.entityName].findFirst({
      where: {
        companyId,
        [field]: value
      }
    })

    if (result && ignoreFields?.length > 0) {
      this.resolveIgnoredFields(result, ignoreFields)
    }
    return result
  }

  async findManyByField(field: string, value: any, companyId: number, ignoreFields?: string[]): Promise<any[]> {
    const results = await this.prismaService[this.entityName].findMany({
      where: {
        companyId,
        [field]: value
      }
    })

    if (results?.length > 0 && ignoreFields?.length > 0) {
      await results.forEach((element) => {
        this.resolveIgnoredFields(element, ignoreFields)
      })
    }

    return results
  }

  async findByFilters<F>(filters: F, ignoreFields: string[]) {
    const results = await this.prismaService[this.entityName].findMany(filters)

    if (results?.length > 0 && ignoreFields?.length > 0) {
      await results.forEach((element) => {
        this.resolveIgnoredFields(element, ignoreFields)
      })
    }

    return results
  }

  protected async resolveIgnoredFields(data, ignoreFields?: string[]) {
    if (ignoreFields?.length > 0)
      for (const field of ignoreFields) {
        delete data[field]
      }
  }
}
