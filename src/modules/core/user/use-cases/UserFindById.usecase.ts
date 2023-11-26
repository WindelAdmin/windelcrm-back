import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindByIdService implements IUseCase {
  private logger = new Logger(UserFindByIdService.name)

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserResponseDto> {
    if (!(await this.userRepository.validateExistId(id))) {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

      const user = await this.userRepository.findById(id)
      return {
        ...user,
        permissions: user.userPermissions.map((uP) => uP.permission)
      }
  }
}
