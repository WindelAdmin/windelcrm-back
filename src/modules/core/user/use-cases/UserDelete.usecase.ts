import { Injectable } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import UserRepository from '../User.repository'

@Injectable()
export default class UserDeleteService implements IUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    if (!(await this.userRepository.validateExistId(id))) {
      throw new HttpNotFoundException(HttpMessages.RECORD_NOT_FOUND)
    }

    await this.userRepository.delete(id)
  }
}
