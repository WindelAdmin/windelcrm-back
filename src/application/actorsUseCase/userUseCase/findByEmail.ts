import { Injectable } from '@nestjs/common';
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter';
import IUseCase from '@src/application/UseCase.interface';
import { UserDto } from '@src/domain/actors/user/dto/user.dto';

@Injectable()
export default class UserFindByEmailUseCase implements IUseCase<string, UserDto> {
  constructor(private readonly prismaAdapter: PrismaAdapter){}

  async execute(input: string): Promise<UserDto> {
    return await this.prismaAdapter.user.findUnique({
      where: {
        email: input
      }
    })
  } 
}