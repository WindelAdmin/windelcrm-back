import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindByIdService implements IUseCase<number, UserResponseDto> {
  private logger = new Logger(UserFindByIdService.name)

  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: number): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findById(input)
      return {
        ...user,
        lastAccess: user.lastAccess?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        permissions: user.userPermissions.map((uP) => uP.permission)
      }
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
