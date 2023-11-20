import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import IUseCase from '@src/interfaces/UseCase.interface'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindByEmailService implements IUseCase<string, UserResponseDto> {
  private logger = new Logger(UserFindByEmailService.name)

  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findByEmail(input)
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
