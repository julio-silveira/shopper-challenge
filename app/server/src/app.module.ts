import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PacksModule } from './packs/packs.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, PacksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
