import { HttpException, Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '@src/repositories/user-repository'
import CurrentUserContext from '../dtos/current-user.dto'
import { UserUpdateDto } from '../dtos/user-update.dto'

const DONT_EXISTS = 'Usuário não existe.'

interface Input {
  companyId: number
  data: UserUpdateDto
  userContext?: CurrentUserContext
}

@Injectable()
export default class UserCreateService implements IUseCase<Input, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const exist = await this.userRepository.findById(input.data.id)
    if (exist) {
      throw new HttpException(DONT_EXISTS, 400)
    }

    this.userRepository.update(input.companyId, input.data, input.userContext)
  }
}
