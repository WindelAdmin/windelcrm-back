import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter';
import IUseCase from '@src/application/use-case.interface';
import { UserDto } from '@src/domain/actors/user/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UserCreateUseCase implements IUseCase<UserDto, void> {
  constructor(private readonly prismaAdapter: PrismaAdapter){}

  async execute(input: UserDto): Promise<void> {
      const data: Prisma.UserCreateInput = {
      ...input,
      password: await bcrypt.hash(input.password, 10),
      lastAccess: null,
      isActive: true,
      createAt: new Date(),
      updatedAt: null
    }

    await this.prismaAdapter.user.create({data: input})
  }

  
}