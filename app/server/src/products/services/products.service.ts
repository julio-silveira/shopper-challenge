import { PrismaService } from '@/prisma/prisma.service';
import { csvParser } from '@/utils/csv.parser';
import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdatePriceEntity } from '../entities/update-price.entity';
import { PriceValidator } from './price.validator';

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
      return { productId: +row[0], newPrice: +row[1] };
    });

    return mappedCsvData;
  }

  async validatePrice(costPrice: number, salesPrice: number, newPrice: number) {
    const errorMessageBuffer: string[] = [];

    const newPriceValidator = new PriceValidator({
      costPrice: costPrice,
      currentPrice: salesPrice,
      newPrice: newPrice,
    });

    if (newPriceValidator.validateFloorPrice()) {
      errorMessageBuffer.push(
        'O novo preço não pode ser menor que o preço de custo',
      );
    }

    if (newPriceValidator.validatePriceVariation()) {
      errorMessageBuffer.push(
        'A variação de preço não pode ser superior à 10%.',
      );
    }

    return errorMessageBuffer;
  }

  async validateProduct(
    code: number,
    newPrice: number,
  ): Promise<UpdatePriceEntity> {
    const product = await this.findOne(code);

    if (!product) {
      return {
        code: code,
        message: ['Produto não encontrado'],
        valid: false,
      };
    }

    const costPrice = product.costPrice.toNumber();
    const salesPrice = product.salesPrice.toNumber();
    const { name } = product;

    const errorMessageBuffer = await this.validatePrice(
      costPrice,
      salesPrice,
      newPrice,
    );

    const hasErrors = errorMessageBuffer.length > 0;

    if (hasErrors) {
      return {
        code,
        name,
        currentPrice: salesPrice,
        newPrice,
        message: errorMessageBuffer,
        valid: false,
      };
    }

    return {
      code,
      name,
      currentPrice: salesPrice,
      newPrice,
      valid: true,
    };
  }
}
