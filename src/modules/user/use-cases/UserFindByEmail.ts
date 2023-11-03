import { Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '../User.repository'
import { UserDto } from '../dtos/User.dto'

@Injectable()
export default class UserFindByEmailService implements IUseCase<string, UserDto> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: string): Promise<UserDto> {
    return (await this.userRepository.findByEmail(input)) as UserDto
  }
}
