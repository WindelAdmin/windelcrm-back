import { HttpException, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { UserContext } from '@src/modules/context/UserContext'
import { HttpUserMessages } from '@src/shared/http-messages/HttpUserMessages'
import * as bcrypt from 'bcrypt'
import { Builder } from 'builder-pattern'
import UserRepository from '../User.repository'
import UserCreateDto from '../dtos/UserCreate.dto'

@Injectable()
export default class UserCreateService implements IUseCase<UserCreateDto, void> {
  private readonly logger = new Logger(UserCreateService.name)

  constructor(private readonly userRepository: UserRepository, private readonly userContext: UserContext) {}

  async execute(input: UserCreateDto): Promise<void> {
    const data = input

    const exist = await this.userRepository.findByEmail(input.email)
    if (exist) {
      throw new HttpException(HttpUserMessages.EMAIL_ALREADY_EXISTS, 409)
    }

    const newUser = Builder<UserCreateDto>(data)
    .password(await bcrypt.hash(data.password, 10))
    .build()
    await this.userRepository.create(newUser)
  }
}
