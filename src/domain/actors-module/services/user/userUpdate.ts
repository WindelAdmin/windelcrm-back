import { Injectable } from '@nestjs/common';
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter';
import { UserDto } from '@src/application/api/user/dto/user.dto';
import IUseCase from '@src/domain/UseCase.interface';

@Injectable()
export default class UserUpdateService implements IUseCase<{ id: number; data: UserDto }, void> {
  constructor(private readonly prismaAdapter: PrismaAdapter) {}

  async execute(input: { id: number; data: UserDto }): Promise<void> {
    await this.prismaAdapter.$transaction([
      this.prismaAdapter.user.update({
        where: {
          id: input.id
        },
        data: input
      })
    ])
  }
}
