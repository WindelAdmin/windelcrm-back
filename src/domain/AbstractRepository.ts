import { Injectable } from '@nestjs/common'
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter'

@Injectable()
export default abstract class AbstractRepository<Entity> {
  entityName: string
  prismaAdapter: PrismaAdapter

  constructor(entityName: string) {
    if (!entityName) {
      throw new Error('O contexto da entidade não foi definido no construtor.')
    }

    this.entityName = entityName
    this.prismaAdapter = new PrismaAdapter()
  }

  async findById(id: number, ignoreFields?: string[]): Promise<Entity> {
    const result = await this.prismaAdapter[this.entityName].findUnique({
      where: {
        id: +id
      }
    })

    if (result) {
      for (const field of ignoreFields) {
        delete result[field]
      }
      return result
    }
    return null
  }

  async findAll(ignoreFields?: string[]): Promise<Entity[]> {
    const results = (await this.prismaAdapter[this.entityName].findMany()) as Entity[]

    if (results?.length > 0) {
      return results.map((result) => {
        for (const field of ignoreFields) {
          delete result[field]
        }
        return result
      })
    }
    return null
  }

  async findOneByField(field: string, value: any, ignoreFields?: string[]): Promise<Entity> {
    const result = (await this.prismaAdapter[this.entityName].findFirst({
      where: {
        [field]: value
      }
    })) as Entity

    if (result) {
      for (const field of ignoreFields) {
        delete result[field]
      }
      return result
    }
    return null
  }

  async findManyByField(field: string, value: any, ignoreFields?: string[]): Promise<Entity[]> {
    const results = (await this.prismaAdapter[this.entityName].findMany({
      where: {
        [field]: value
      }
    })) as Entity[]

    if (results?.length > 0) {
      return results.map((result) => {
        for (const field of ignoreFields) {
          delete result[field]
        }
        return result
      })
    }
    return null
  }
}
