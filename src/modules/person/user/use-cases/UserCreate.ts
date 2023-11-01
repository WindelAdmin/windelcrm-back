import { HttpException, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { UserContext } from '@src/modules/context/UserContext'
import * as bcrypt from 'bcrypt'
import { Builder } from 'builder-pattern'
import UserModel from '../User.model'
import UserRepository from '../User.repository'
import { UserCreateDto } from '../dtos/UserCreate.dto'

const EMAIL_ALREADY_EXISTS = 'E-mail já existe.'

@Injectable()
export default class UserCreateService implements IUseCase<UserCreateDto, void> {
  private readonly logger = new Logger(UserCreateService.name)

  constructor(private readonly userRepository: UserRepository, private readonly userContext: UserContext) {}

  async execute(input: UserCreateDto): Promise<void> {
    const data = input

    const exist = await this.userRepository.findByEmail(input.email)
    if (exist) {
      throw new HttpException(EMAIL_ALREADY_EXISTS, 400)
    }

    const newUser = Builder<UserModel>()
      .name(data.name)
      .email(data.email)
      .password(await bcrypt.hash(data.password, 10))
      .companyId(this.userContext.getUserContext().companyId)
      .userPermissions({
        createMany: {
          data: data.userPermissions.map((permission) => {
            return {
              permissionId: permission.id,
              companyId: this.userContext.getUserContext().companyId
            }
          })
        }
      })
      .isLogged(false)
      .build()

    this.userRepository.create(newUser)
  }
}
