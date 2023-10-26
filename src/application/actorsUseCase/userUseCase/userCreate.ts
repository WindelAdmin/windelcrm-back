import { Injectable, Logger } from '@nestjs/common'
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter'
import IUseCase from '@src/application/UseCase.interface'
import { UserDto } from '@src/domain/actors/user/dto/user.dto'
import { User } from '@src/domain/actors/user/user.entity'
import * as bcrypt from 'bcrypt'
import { Builder } from 'builder-pattern'

@Injectable()
export default class UserCreateUseCase implements IUseCase<UserDto, void> {
  private readonly logger = new Logger(UserCreateUseCase.name)

  constructor(private readonly prismaAdapter: PrismaAdapter) {}

  async execute(input: UserDto): Promise<void> {
    const newUser = Builder<User>()
    .name(input.name)
    .email(input.email)
    .password(await bcrypt.hash(input.password, 10))
    .permissions({})
    .build()

    await this.prismaAdapter.user.create({
      data: newUser
    })
    
    this.logger.log(`User created: ${newUser}`)
  }
}
