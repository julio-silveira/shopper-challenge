import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
