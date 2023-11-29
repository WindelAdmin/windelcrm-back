import { Injectable } from '@nestjs/common'
import IUseCase from '@shared/interfaces/UseCase.interface'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindAllService implements IUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll()
    return users.map((user) => {
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
    })
  }
}
