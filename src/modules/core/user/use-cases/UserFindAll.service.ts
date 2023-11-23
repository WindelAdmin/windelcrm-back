import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@shared/interfaces/UseCase.interface'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindAllService implements IUseCase<void, UserResponseDto[]> {
  private logger = new Logger(UserFindAllService.name)

  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userRepository.findAll()
      return users
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
