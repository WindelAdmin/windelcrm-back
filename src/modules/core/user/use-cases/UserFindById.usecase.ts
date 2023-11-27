import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindByIdService implements IUseCase {

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id)

    if (user) {
      return {
        ...user,
        permissions: user.userPermissions.map((uP) => uP.permission)
      }
    } else {
      throw new HttpException(HttpMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }
}
