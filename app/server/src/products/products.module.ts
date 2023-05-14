import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ProductsController } from './controllers/products.controller';
import { PacksService } from './services/packs.service';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, PacksService],
})
export class ProductsModule {}
