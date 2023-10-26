import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaInitialize extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        {
          emit: 'stdout',
          level: 'query'
        },
        {
          emit: 'stdout',
          level: 'info'
        },
        {
          emit: 'stdout',
          level: 'warn'
        },
        {
          emit: 'stdout',
          level: 'error'
        }
      ]
    })
  }

  async onModuleInit(): Promise<void> {
    await this.$connect()
  }
}