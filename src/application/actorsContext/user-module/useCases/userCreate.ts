import { Injectable } from '@nestjs/common';
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter';
import IUseCase from '@src/application/use-case.interface';
import { UserDto } from '@src/domain/actors/user/dto/user.dto';
import { User } from '@src/domain/actors/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UserCreateUseCase implements IUseCase<UserDto, void> {
  constructor(private readonly prismaAdapter: PrismaAdapter){}

  async execute(input: UserDto): Promise<void> {
      const data: User = {
      ...input,
      password: await bcrypt.hash(input.password, 10),
      lastAccess: null,
      isActive: true,
      createAt: new Date(),
      updatedAt: null,
      permissions: null,
      employee: null
    }

    await this.prismaAdapter.user.create({data: data})
  }

  
}