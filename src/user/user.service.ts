import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDto } from './dto/user.dto'

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
