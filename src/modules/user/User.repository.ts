import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@src/interfaces/Repository.abstract'
import UserModel from './User.model'

@Injectable()
export default class UserRepository extends AbstractRepository<UserModel> {
  constructor() {
    super(Prisma.ModelName.User)
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.prismaService[this.entityName].findUnique({
      where: {
        email
      }
    })
  }
}
