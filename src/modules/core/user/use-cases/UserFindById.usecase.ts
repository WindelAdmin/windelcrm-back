import { Injectable } from '@nestjs/common'
import { HttpMessages } from '@shared/http-messages/HttpMessages'
import IUseCase from '@shared/interfaces/UseCase.interface'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindByIdService implements IUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserResponseDto> {
    let user = await this.userRepository.findById(id)

    if (!user) throw new HttpNotFoundException(HttpMessages.ID_NOT_EXIST)

    let userResolved = {
      ...user,
      permissions: user.userPermissions.map((uP) => {
        delete uP.permission.createdAt
        delete uP.permission.updatedAt
        return uP.permission
      })
    }
    delete userResolved.password
    delete userResolved.userPermissions
    return userResolved
  }
}
