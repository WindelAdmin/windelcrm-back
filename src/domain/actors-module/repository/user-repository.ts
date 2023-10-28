import { Injectable } from '@nestjs/common'
import AbstractRepository from '@src/domain/AbstractRepository'
import IRepository from '@src/domain/IRepository'
import { User } from '../entities/user.entity'

@Injectable()
export default class UserRepository extends AbstractRepository<User> implements IRepository<User> {
  constructor() {
    super('user')
  }
  update(id: number, data: User): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async save(entity: User): Promise<void> {
    this.prismaAdapter.user.create({
      data: entity
    })
  }
}
