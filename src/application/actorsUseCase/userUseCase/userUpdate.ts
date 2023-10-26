import { Injectable } from '@nestjs/common';
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter';
import IUseCase from '@src/application/UseCase.interface';
import { UserDto } from '@src/domain/actors/user/dto/user.dto';

@Injectable()
export default class UserUpdateUseCase implements IUseCase<{id: number, data: UserDto}, void> {
  constructor(private readonly prismaAdapter: PrismaAdapter){}

  async execute(input: {id: number, data: UserDto}): Promise<void> {
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