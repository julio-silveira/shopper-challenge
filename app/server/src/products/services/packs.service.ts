import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PacksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return 'packs';
  }

  async findOne(code: number): Promise<string> {
    return 'pack';
  }
}
