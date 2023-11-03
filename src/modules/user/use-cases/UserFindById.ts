import { Injectable } from '@nestjs/common';
import IUseCase from '@src/interfaces/IUseCase';
import UserRepository from '../User.repository';
import { UserDto } from '../dtos/User.dto';

@Injectable()
export default class UserFindByIdService implements IUseCase<number, UserDto>{
  constructor(private readonly userRepository: UserRepository){}

  async execute(input: number): Promise<UserDto> {

    return await this.userRepository.findById(input) as UserDto
  }
}