import { HttpException, Injectable } from '@nestjs/common';
import IUseCase from '@src/interfaces/IUseCase';
import UserRepository from '@src/repositories/user-repository';
import { UserCreateDto } from '../dtos/user-create.dto';

const DONT_EXISTS = 'Usuário não existe.'

interface Input{
  id: number,
  companyId: number
  data: UserCreateDto}

@Injectable()
export default class UserCreateService implements IUseCase<Input, void>{
  constructor(private readonly userRepository: UserRepository){}

  async execute(input: Input): Promise<void> {

    const data = input.data;

     const exist = await this.userRepository.findById(input.id)
    if (exist) {
      throw new HttpException(DONT_EXISTS, 400)
    }

  }
}