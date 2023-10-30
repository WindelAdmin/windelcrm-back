import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@src/interfaces/AbstractRepository'
import { UserDto } from '@src/modules/person/user/dtos/user.dto'
import { User } from '@src/modules/person/user/user.entity'

@Injectable()
export default class UserRepository extends AbstractRepository{
  constructor() {
    super(Prisma.ModelName.User)
  }

  override async findById(id: number): Promise<UserDto> {
    const result = await this.prismaService.user.findFirst({
      where: {
        id: id
      }
    })

    await this.resolveIgnoredFields(result, ['password'])
    return result
  }

  async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        email
      }
    })
  }
}
