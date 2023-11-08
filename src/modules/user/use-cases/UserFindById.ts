import { Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindByIdService implements IUseCase<number, UserResponseDto> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: number): Promise<UserResponseDto> {
    //return (await this.userRepository.findById(input))
    return
  }
}
