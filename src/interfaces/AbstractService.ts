import { Injectable } from '@nestjs/common'
import AbstractRepository from './AbstractRepository'

@Injectable()
export default abstract class AbstractService<Repository extends AbstractRepository> {
  constructor(private readonly repository: Repository) {}

  async create(entity: any): Promise<void> {
    this.repository.create(entity)
  }

  async update(id: number, companyId: number, data: any): Promise<any> {
    this.repository.update(id, companyId, data)
  }

  async delete(id: number): Promise<any> {
    this.repository.delete(id)
  }

  async findById(id: number, ignoreFields?: string[]): Promise<any> {
    return this.repository.findById(id, ignoreFields)
  }

  async findAll(companyId: number, ignoreFields?: string[]): Promise<any[]> {
    return this.repository.findAll(companyId, ignoreFields)
  }

  async findOneByField(field: string, value: any, companyId: number, ignoreFields?: string[]): Promise<any> {
    return this.repository.findOneByField(field, value, companyId, ignoreFields)
  }

  async findManyByField(field: string, value: any, companyId: number, ignoreFields?: string[]): Promise<any[]> {
    return this.repository.findManyByField(field, value, companyId, ignoreFields)
  }
}
