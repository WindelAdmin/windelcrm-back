import { HttpException, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { UserContext } from '@src/modules/context/UserContext'
import UserRepository from '@src/modules/person/user/User.repository'
import { UserUpdateDto } from '../dtos/UserUpdate.dto'

const DONT_EXISTS = 'Usuário não existe.'

@Injectable()
export default class UserUpdateService implements IUseCase<UserUpdateDto, void> {

  private readonly logger = new Logger(UserUpdateService.name)

  constructor(private readonly userRepository: UserRepository, private readonly userContext: UserContext) {}

  async execute(input: UserUpdateDto): Promise<void> {

    try {
    const exist = await this.userRepository.findById(input.id)
    if (exist) {
      throw new HttpException(DONT_EXISTS, 400)
    }

    this.userRepository.update(input, this.userContext.getUserContext())
    }catch (err) {
      this.logger.error(err)
    }
  }
}
