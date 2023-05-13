import { Prisma } from '@prisma/client';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductEntity } from 'src/products/entities/product.entity';

export const products: ProductEntity[] = [
  {
    code: 100,
    name: 'SODA',
    costPrice: new Prisma.Decimal(10),
    salesPrice: new Prisma.Decimal(20),
  },
  {
    code: 200,
    name: 'WATER',
    costPrice: new Prisma.Decimal(5),
    salesPrice: new Prisma.Decimal(10),
  },
  {
    code: 300,
    name: 'BEER',
    costPrice: new Prisma.Decimal(15),
    salesPrice: new Prisma.Decimal(30),
  },
];

export const createProduct: CreateProductDto = {
  code: 100,
  name: 'SODA',
  costPrice: 10,
  salesPrice: 20,
};

export const parsedCsvData = [
  ['16', '25.50'],
  ['18', '30'],
  ['19', '20'],
];
