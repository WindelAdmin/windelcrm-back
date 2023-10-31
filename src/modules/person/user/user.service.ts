import { Injectable } from '@nestjs/common'
import AbstractService from '@src/interfaces/AbstractService'
import UserRepository from '@src/repositories/user-repository'
import { UserDto } from './dtos/user.dto'

@Injectable()
export default class UserService extends AbstractService<UserRepository> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository)
  }

  async findByEmail(email: string): Promise<UserDto> {
    return (await this.userRepository.findByEmail(email)) as UserDto
  }
}
