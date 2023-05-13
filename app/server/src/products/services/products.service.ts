import { PrismaService } from '@/prisma/prisma.service';
import { csvParser } from '@/utils/csv.parser';
import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdatePriceEntity } from '../entities/update-price.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    await this.prisma.product.create({ data: createProductDto });

    return { message: 'Produto cadastrado com sucesso' };
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOne(code: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { code } });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async parseProductCsv(filePath: string) {
    const csvData = await csvParser(filePath);

    const mappedCsvData = csvData.map((row) => {
      return { productId: row[0], newPrice: row[1] };
    });

    return mappedCsvData;
  }

  async validateProduct(
    code: string,
    newPrice: string,
  ): Promise<UpdatePriceEntity> {
    const product = await this.findOne(+code);

    if (!product) {
      return {
        code: +code,
        message: ['Produto não encontrado'],
        valid: false,
      };
    }

    return {
      code: +code,
      name: product.name,
      currentPrice: +product.salesPrice,
      newPrice: +newPrice,
      valid: true,
    };
  }
}
