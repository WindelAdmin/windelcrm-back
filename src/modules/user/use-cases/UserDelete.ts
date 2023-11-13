import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { HttpMessages } from '@src/shared/http-messages/HttpMessages'
import UserRepository from '../User.repository'

@Injectable()
export default class UserDeleteService implements IUseCase<number, void> {
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
