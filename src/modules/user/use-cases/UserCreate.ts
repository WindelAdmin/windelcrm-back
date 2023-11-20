import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/UseCase.interface'
import { UserContext } from '@src/modules/contexts/UserContext'
import { CryptoService } from '@src/modules/crypto/Crypto.service'
import { HttpUserMessages } from '@src/shared/http-messages/HttpUserMessages'
import UserRepository from '../User.repository'
import UserCreateDto from '../dtos/UserCreate.dto'

@Injectable()
export default class UserCreateService implements IUseCase<UserCreateDto, void> {
  private readonly logger = new Logger(UserCreateService.name)
  @Inject()
  private readonly userRepository: UserRepository;
  @Inject()
  private readonly userContext: UserContext
  @Inject()
  private readonly cryptoService: CryptoService

  constructor() {}

  async execute(input: UserCreateDto): Promise<void> {
    if (await this.userRepository.validateExistEmail(input.email)) {
      throw new HttpException(HttpUserMessages.EMAIL_ALREADY_EXISTS, 409)
    }

    try {
      input.password = await  this.cryptoService.encrypt(input.password)
      await this.userRepository.create(input)
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
