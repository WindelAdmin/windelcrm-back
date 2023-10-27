import { Injectable } from '@nestjs/common';
import IUseCase from '@src/domain/UseCase.interface';
import { User } from '../../entities/user.entity';
import UserRepository from '../../repository/user-repository';

@Injectable()
export default class UserFindByEmailService implements IUseCase<string, User> {
  constructor(private readonly userRepository: UserRepository){}

  async execute(input: string): Promise<User> {
    return await this.userRepository.findByEmail(input)
  } 
}