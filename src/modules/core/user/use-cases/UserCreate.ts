import { CryptoService } from '@modules/generic/crypto/Crypto.service'
import { Injectable } from '@nestjs/common'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpConflictException } from '@src/shared/exceptions/Http.exception'
import { HttpUserMessages } from '@src/shared/http-messages/HttpUserMessages'
import UserRepository from '../User.repository'
import UserCreateDto from '../dtos/UserCreate.dto'

@Injectable()
export default class UserCreateService implements IUseCase<UserCreateDto, void> {
  constructor(private readonly userRepository: UserRepository, private readonly cryptoService: CryptoService) {}

  async execute(input: UserCreateDto): Promise<void> {
    if (await this.userRepository.validateExistEmail(input.email)) {
      HttpConflictException(HttpUserMessages.EMAIL_ALREADY_EXISTS)
    }

    input.password = await this.cryptoService.encrypt(input.password)

    await this.userRepository.create(input)
  }
}
