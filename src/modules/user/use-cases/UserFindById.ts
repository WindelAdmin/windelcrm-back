import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/UseCase.interface'
import { HttpMessages } from '@src/shared/http-messages/HttpMessages'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindByIdService implements IUseCase<number, UserResponseDto> {
  private logger = new Logger(UserFindByIdService.name)

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserResponseDto> {
    if (!(await this.userRepository.validateExistId(id))) {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    try {
      const user = await this.userRepository.findById(id)
      return {
        ...user,
        permissions: user.userPermissions.map((uP) => uP.permission)
      }
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
