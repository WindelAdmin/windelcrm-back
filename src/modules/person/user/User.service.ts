import { Injectable } from '@nestjs/common'
import AbstractService from '@src/interfaces/AbstractService'
import { UserContext } from '@src/modules/context/UserContext'
import UserRepository from '@src/modules/person/user/User.repository'
import { UserDto } from './dtos/User.dto'

@Injectable()
export default class UserService extends AbstractService<UserRepository> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository, new UserContext())
  }

  async findByEmail(email: string): Promise<UserDto> {
    return (await this.userRepository.findByEmail(email)) as UserDto
  }
}
