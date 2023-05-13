import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
