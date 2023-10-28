import { Injectable } from '@nestjs/common'
import AbstractRepository from './AbstractRepository'

@Injectable()
export default abstract class AbstractService<Entity> extends AbstractRepository<Entity> {
  constructor(entityName: string) {
    super(entityName)
  }
}
