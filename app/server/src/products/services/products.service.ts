import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    await this.prisma.product.create({ data: createProductDto });

    return { message: 'Produto cadastrado com sucesso' };
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(code: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { code } });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
