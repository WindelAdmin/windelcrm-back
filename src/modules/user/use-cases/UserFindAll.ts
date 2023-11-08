import { Injectable } from '@nestjs/common'
import IUseCase from '@src/interfaces/IUseCase'
import { Builder } from 'builder-pattern'
import UserRepository from '../User.repository'
import { UserResponseDto } from '../dtos/UserResponse.dto'

@Injectable()
export default class UserFindAllService implements IUseCase<void, UserResponseDto[]> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();

    return users.map((u) => Builder<UserResponseDto>()
      .id(u.id)
      .companyId(u.companyId)
      .name(u.name)
      .email(u.email)
      .isLogged(u.isLogged)
      .isActive(u.isActive)
      .lastAccess(u.lastAccess?.toISOString())
      .createdAt(u.createdAt.toISOString())
      .updatedAt(u.updatedAt?.toISOString())
    .build());
  }
}
