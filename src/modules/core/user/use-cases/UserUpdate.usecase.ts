import { Injectable } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import UserRepository from '../User.repository'
import { UserUpdateDto } from '../dtos/UserUpdate.dto'

interface Input {
  id: number
  data: UserUpdateDto
}

@Injectable()
export default class UserUpdateService implements IUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    if (!(await this.userRepository.validateExistId(input.id))) {
      throw new HttpNotFoundException(HttpMessages.ID_NOT_EXIST)
    }

       await this.userRepository.update(input.id, input.data)
  }
}
