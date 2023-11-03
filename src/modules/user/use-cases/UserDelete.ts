import { Injectable } from '@nestjs/common';
import IUseCase from '@src/interfaces/IUseCase';
import UserRepository from '../User.repository';

@Injectable()
export default class UserDeleteService implements IUseCase<number, void>{
  constructor(private readonly userRepository: UserRepository){}

  async execute(input: number): Promise<void> {
    await this.userRepository.delete(input)
  }
}