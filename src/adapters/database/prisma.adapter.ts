import { Injectable } from '@nestjs/common'
import { PrismaInitialize } from '@src/infra/database/prisma-initialize'

@Injectable()
export class PrismaAdapter extends PrismaInitialize {
  
}
