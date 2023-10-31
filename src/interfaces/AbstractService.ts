import { UserContext } from '@src/modules/context/UserContext';
import AbstractRepository from './AbstractRepository';

export default class AbstractService<Repository extends AbstractRepository> {
  constructor(private readonly repository: Repository, protected readonly userContext: UserContext) {
  }

  async create(entity: any): Promise<void> {
    this.repository.create(entity, this.userContext.getUserContext())
  }

  async update(data: any): Promise<any> {
    this.repository.update(data, this.userContext.getUserContext())
  }

  async delete(id: number): Promise<any> {
    this.repository.delete(id, this.userContext.getUserContext())
  }

  async findById(id: number, ignoreFields?: string[]): Promise<any> {
    return this.repository.findById(id, ignoreFields)
  }

  async findAll(ignoreFields?: string[]): Promise<any[]> {
    return this.repository.findAll(this.userContext.getUserContext().companyId, ignoreFields)
  }

  async findOneByField(field: string, value: any, ignoreFields?: string[]): Promise<any> {
    return this.repository.findOneByField(field, value, this.userContext.getUserContext().companyId, ignoreFields)
  }

  async findManyByField(field: string, value: any, ignoreFields?: string[]): Promise<any[]> {
    return this.repository.findManyByField(field, value, this.userContext.getUserContext().companyId, ignoreFields)
  }
}
