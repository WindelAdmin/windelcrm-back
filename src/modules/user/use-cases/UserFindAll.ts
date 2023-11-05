import { Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindAllService implements IUseCase<void, UserResponseDto[]> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDto[]> {
    return (await this.userRepository.findAll()) as UserResponseDto[]
  }
}
