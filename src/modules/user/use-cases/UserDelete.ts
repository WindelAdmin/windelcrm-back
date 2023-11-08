import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { HttpMessages } from '@src/shared/http-messages/HttpMessages'
import UserRepository from '../User.repository'

@Injectable()
export default class UserDeleteService implements IUseCase<number, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    if (!(await this.userRepository.validateExistById(id))) {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    await this.userRepository.delete(id)
  }
}
