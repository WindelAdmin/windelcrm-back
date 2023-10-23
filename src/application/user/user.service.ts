import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UserDto } from '@src/domain/user/dto/user.dto'
import { PrismaService } from '@src/infra/database/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(record: UserDto): Promise<UserDto> {
    const data: Prisma.UserCreateInput = {
      ...record,
      password: await bcrypt.hash(record.password, 10)
    }

    const createdUser = await this.prisma.user.create({ data })

    return {
      ...createdUser,
      password: undefined
    }
  }

  findByEmail(email: string): Promise<UserDto> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findAll(): Promise<UserDto[]> {
    return await this.prisma.user.findMany()
  }

  async findOne(id: number): Promise<UserDto> {
    return await this.prisma.user.findFirst({
      where: { id }
    })
  }
}
