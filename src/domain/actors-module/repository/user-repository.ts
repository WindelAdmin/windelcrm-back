import { PrismaAdapter } from '@src/adapters/database/prisma.adapter';
import { User } from '../entities/user.entity';

export default class UserRepository {
  constructor(private readonly prismaAdapter: PrismaAdapter){}

 async save(user: User): Promise<void>{
    this.prismaAdapter.user.create({
      data: user
    })
  }

  findByEmail(email: string): Promise<User>{
    return this.prismaAdapter.user.findFirst({
      where: {
        email
      }
    })
  }
}