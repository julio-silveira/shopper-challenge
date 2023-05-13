import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
