import { Logger } from '@nestjs/common'
import { PrismaService } from '@src/infra/persistence/prisma-service'
import { AuthUserDto } from '@src/modules/auth/dtos/auth-request.dto'
import { now } from '@src/shared/utils/date-utils'

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

  async create(data: any, userContextData?: AuthUserDto): Promise<any> {
    try {
      const resultData = await this.prismaService[this.entityName].create({
        data
      })
      
      if (userContextData) {
        await this.prismaService.audit.create({
          data: {
            userId: userContextData.id,
            userEmail: userContextData.email,
            companyId: userContextData.companyId,
            after: resultData,
            createdAt: now()
          }
        })
      }
    } catch (err) {
      this.logger.error(err)
    }
  }

  async update(data: any, userContextData?: AuthUserDto): Promise<void> {
    const updatedData = await this.prismaService[this.entityName].update({
      where: {
        companyId: 1,
        id: data.id
      },
      data: data
    })

    if (userContextData) {
      await this.prismaService.audit.create({
        data: {
            userId: userContextData.id,
            userEmail: userContextData.email,
            companyId: userContextData.companyId,
          before: data,
          after: updatedData,
          createdAt: now()
        }
      })
    }
  }

  async delete(id: number, userContextData?: AuthUserDto): Promise<any> {
    try {
      await this.prismaService[this.entityName].delete({
        where: {
          companyId: userContextData.companyId,
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

  protected async resolveIgnoredFields(data, ignoreFields?: string[]): Promise<void> {
    if (ignoreFields?.length > 0)
      for (const field of ignoreFields) {
        delete data[field]
      }
  }
}
