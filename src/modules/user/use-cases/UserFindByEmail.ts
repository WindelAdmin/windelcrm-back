import { Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindByEmailService implements IUseCase<string, UserResponseDto> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: string): Promise<UserResponseDto> {
    //return (await this.userRepository.findByEmail(input))
    return
  }
}
