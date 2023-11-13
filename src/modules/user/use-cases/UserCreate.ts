import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { UserContext } from '@src/modules/context/UserContext'
import { HttpUserMessages } from '@src/shared/http-messages/HttpUserMessages'
import bcrypt from 'bcrypt'
import UserRepository from '../User.repository'
import UserCreateDto from '../dtos/UserCreate.dto'

@Injectable()
export default class UserCreateService implements IUseCase<UserCreateDto, void> {
  private readonly logger = new Logger(UserCreateService.name)

  constructor(private readonly userRepository: UserRepository, private readonly userContext: UserContext) {}

  async execute(input: UserCreateDto): Promise<void> {
    if (await this.userRepository.validateExistEmail(input.email)) {
      throw new HttpException(HttpUserMessages.EMAIL_ALREADY_EXISTS, 409)
    }

    try {
      input.password = await bcrypt.hash(input.password, 10)
      await this.userRepository.create(input)
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
