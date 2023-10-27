import { Injectable, Logger } from '@nestjs/common'
import { PrismaAdapter } from '@src/adapters/database/prisma.adapter'
import { UserDto } from '@src/application/api/user/dto/user.dto'
import IUseCase from '@src/domain/UseCase.interface'
import * as bcrypt from 'bcrypt'
import { Builder } from 'builder-pattern'
import { User } from '../../entities/user.entity'

@Injectable()
export default class UserCreateService implements IUseCase<UserDto, void> {
  private readonly logger = new Logger(UserCreateService.name)

  constructor(private readonly prismaAdapter: PrismaAdapter) {}

  async execute(input: UserDto): Promise<void> {
    const newUser = Builder<User>()
      .name(input.name)
      .email(input.email)
      .password(await bcrypt.hash(input.password, 10))
      .companyId(input.companyId)
      .isLogged(false)
      .build()

    const userCreated = await this.prismaAdapter.user.create({
      data: newUser
    })

    this.logger.log(`User created: `, userCreated)
  }
}
