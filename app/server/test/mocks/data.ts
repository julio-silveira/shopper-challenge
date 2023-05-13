import { Prisma } from '@prisma/client';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductEntity } from 'src/products/entities/product.entity';

export const product: ProductEntity = {
  code: 100,
  name: 'SODA',
  costPrice: new Prisma.Decimal(10),
  salesPrice: new Prisma.Decimal(20),
};

export const createProduct: CreateProductDto = {
  code: 100,
  name: 'SODA',
  costPrice: 10,
  salesPrice: 20,
};
