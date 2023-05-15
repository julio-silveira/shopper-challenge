import { PrismaService } from '@/prisma/prisma.service';
import { csvParser } from '@/utils/csv.parser';
import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdatePriceDto } from '../dto/price.dto';
import { UpdatePriceEntity } from '../entities/update-price.entity';
import { PriceUpdateInteface } from '../interfaces/price-update.interface';
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

  async updatePrices(productData: UpdatePriceDto[]) {
    try {
      await Promise.all(
        productData.map(async (product) => {
          const { code, newPrice } = product;

          const productValidation = await this.validateProduct(code, newPrice);

          if (!productValidation.valid) {
            throw Error('Produto Inválido');
          }

          await this.prisma.product.update({
            where: { code },
            data: { salesPrice: newPrice },
          });
        }),
      );
      return { message: 'Preços atualizados com sucesso' };
    } catch (err) {
      return null;
    }
  }

  async parseProductCsv(filePath: string): Promise<PriceUpdateInteface[]> {
    try {
      const csvData = await csvParser(filePath);

      const mappedCsvData = csvData.map((row) => {
        return { code: +row[0], newPrice: +row[1] };
      });

      return mappedCsvData;
    } catch (err) {
      return null;
    }
  }

  async validatePrice(
    costPrice: number,
    salesPrice: number,
    newPrice: number | string,
  ) {
    const errorMessageBuffer: string[] = [];

    const parsedNewPrice =
      typeof newPrice === 'number' ? newPrice : parseFloat(newPrice);

    if (isNaN(parsedNewPrice)) {
      errorMessageBuffer.push('O novo preço deve ser um número.');
      return errorMessageBuffer;
    }

    const newPriceValidator = new PriceValidator({
      costPrice: costPrice,
      currentPrice: salesPrice,
      newPrice: parsedNewPrice,
    });

    if (newPriceValidator.validateFloorPrice()) {
      errorMessageBuffer.push(
        'O novo preço não pode ser menor que o preço de custo.',
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
        message: ['Produto não encontrado.'],
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
