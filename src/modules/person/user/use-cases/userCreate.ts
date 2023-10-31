import { HttpException, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '@src/repositories/user-repository'
import * as bcrypt from 'bcrypt'
import { Builder } from 'builder-pattern'
import CurrentUserContext from '../dtos/current-user.dto'
import { UserDto } from '../dtos/user.dto'
import { User } from '../user.entity'

const EMAIL_ALREADY_EXISTS = 'E-mail já existe.'

interface Input {
  data: UserDto
  userContext: CurrentUserContext
}

@Injectable()
export default class UserCreateService implements IUseCase<Input, void> {
  private readonly logger = new Logger(UserCreateService.name)

  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const data = input.data

    try {
      const exist = await this.userRepository.findByEmail(input.data.email)
      if (exist) {
        throw new HttpException(EMAIL_ALREADY_EXISTS, 400)
      }

      const newUser = Builder<User>()
        .name(data.name)
        .email(data.email)
        .password(await bcrypt.hash(data.password, 10))
        .companyId(input.userContext.companyId)
        .userPermissions({
          createMany: {
            data: data.userPermissions.map((permission) => {
              return {
                permissionId: permission.id,
                companyId: input.userContext.companyId
              }
            })
          }
        })
        .isLogged(false)
        .build()

      this.userRepository.create(newUser, input.userContext)
    } catch (err) {
      this.logger.error(err)
    }
  }
}
