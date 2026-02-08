import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      //console.log('conexion exitosa');
    } catch (error) {
      //console.error('conexion fallida', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}