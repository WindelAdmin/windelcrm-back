import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import UserRepository from '../User.repository'

@Injectable()
export default class UserDeleteService implements IUseCase {
  private logger = new Logger(UserDeleteService.name)

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    if (!(await this.userRepository.validateExistId(id))) {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    try {
      await this.userRepository.delete(id)
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
