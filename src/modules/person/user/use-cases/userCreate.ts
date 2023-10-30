import { HttpException, Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '@src/repositories/user-repository'
import * as bcrypt from 'bcrypt'
import { Builder } from 'builder-pattern'
import { UserCreateDto } from '../dtos/user-create.dto'
import { User } from '../user.entity'

const EMAIL_ALREADY_EXISTS = 'E-mail já existe.'

interface Input {
  data: UserCreateDto
  companyId: number
}

@Injectable()
export default class UserCreateService implements IUseCase<Input, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const data = input.data

    const exist = await this.userRepository.findByEmail(input.data.email)
    if (exist) {
      throw new HttpException(EMAIL_ALREADY_EXISTS, 400)
    }

    const newUser = Builder<User>()
      .name(data.name)
      .email(data.email)
      .password(await bcrypt.hash(data.password, 10))
      .companyId(input.companyId)
      .userPermissions({
        createMany: {
          data: data.permissions.map((permission) => {
            return {
              permissionId: permission.id,
              companyId: input.companyId
            }
          })
        }
      })
      .isLogged(false)
      .build()

    this.userRepository.create(newUser)
  }
}
