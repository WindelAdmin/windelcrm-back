import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractService from '@src/domain/AbstractService'
import { User } from '../../entities/user.entity'

@Injectable()
export default class UserQueryService extends AbstractService<User> {
  constructor() {
    super(Prisma.ModelName.User)
  }
}
