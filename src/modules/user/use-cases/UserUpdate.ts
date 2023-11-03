import { HttpException, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { UserContext } from '@src/modules/context/UserContext'
import { Builder } from 'builder-pattern'
import UserModel from '../User.model'
import UserRepository from '../User.repository'
import { UserUpdateDto } from '../dtos/UserUpdate.dto'

const DONT_EXISTS = 'Usuário não existe.'

interface Input {
  id: number
  data: UserUpdateDto
}

@Injectable()
export default class UserUpdateService implements IUseCase<Input, void> {
  private readonly logger = new Logger(UserUpdateService.name)

  constructor(private readonly userRepository: UserRepository, private readonly userContext: UserContext) {}

  async execute(input: Input): Promise<void> {
    try {
      const exist = await this.userRepository.findById(input.id)

      if (!exist) {
        throw new HttpException(DONT_EXISTS, 400)
      }

      const newUser = Builder<UserModel>()
        .name(input.data.name)
        .email(input.data.email)
        .companyId(this.userContext.getUserContext().companyId)
        .isLogged(false)
        .build()

      this.userRepository.update(input.id, newUser)
    } catch (err) {
      this.logger.error(err)
    }
  }
}
