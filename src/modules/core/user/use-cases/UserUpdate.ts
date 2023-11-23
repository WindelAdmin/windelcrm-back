import { UserContext } from '@modules/aux/contexts/User.context'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import UserRepository from '../User.repository'
import { UserUpdateDto } from '../dtos/UserUpdate.dto'

interface Input {
  id: number
  data: UserUpdateDto
}

@Injectable()
export default class UserUpdateService implements IUseCase<Input, void> {
  private readonly logger = new Logger(UserUpdateService.name)

  constructor(private readonly userRepository: UserRepository, private readonly userContext: UserContext) {}

  async execute(input: Input): Promise<void> {
    if (!(await this.userRepository.validateExistId(input.id))) {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    try {
      await this.userRepository.update(input.id, input.data)
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
