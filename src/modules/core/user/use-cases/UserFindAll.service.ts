import { Injectable, Logger } from '@nestjs/common'
import IUseCase from '@shared/interfaces/UseCase.interface'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindAllService implements IUseCase {
  private logger = new Logger(UserFindAllService.name)

  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDto[]> {
      const users = await this.userRepository.findAll()
      return users;
  }
}
