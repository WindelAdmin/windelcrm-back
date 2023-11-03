import { Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '../User.repository'
import { UserDto } from '../dtos/User.dto'

@Injectable()
export default class UserFindAllService implements IUseCase<void, UserDto[]> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserDto[]> {
    return (await this.userRepository.findAll()) as UserDto[]
  }
}
