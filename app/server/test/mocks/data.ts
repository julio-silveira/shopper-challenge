import { PackComponentEntity } from '@/products/entities/pack-component.entity';
import { PackProductEntity } from '@/products/entities/pack-product.entity';
import { PackEntity } from '@/products/entities/pack.entity';
import { UpdatePriceEntity } from '@/products/entities/update-price.entity';
import { PriceUpdateInteface } from '@/products/interfaces/price-update.interface';
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
  ['16', '21'],
  ['1000', '41'],
  ['100', '80'],
  ['200', '4'],
  ['1001', '50'],
];

export const productCsvData: PriceUpdateInteface[] = [
  { code: 16, newPrice: 21 },
  { code: 1000, newPrice: 41 },
  { code: 100, newPrice: 80 },
  { code: 200, newPrice: 4 },
  { code: 1001, newPrice: 50 },
];

export const productUpdateMock: UpdatePriceEntity[] = [
  {
    code: 16,
    name: 'SODA',
    currentPrice: 20,
    newPrice: 2,
    valid: true,
  },
  {
    code: 1000,
    name: 'PACK 1',
    currentPrice: 40,
    newPrice: 41,
    valid: true,
  },
  {
    code: 100,
    name: 'SODA',
    currentPrice: 10,
    newPrice: 10.5,
    valid: true,
  },
  {
    code: 200,
    name: 'WATER',
    currentPrice: 5,
    newPrice: 5.3,
    valid: true,
  },
  {
    code: 1001,
    name: 'PACK 2',
    currentPrice: 50,
    newPrice: 100,
    valid: false,
    message: ['A variação de preço não pode ser superior à 10%.'],
  },
];

export const pack: PackComponentEntity[] = [
  {
    id: 1,
    packId: 1000,
    productId: 100,
    qty: 1,
  },
  {
    id: 2,
    packId: 1000,
    productId: 200,
    qty: 2,
  },
  {
    id: 3,
    packId: 1001,
    productId: 300,
    qty: 3,
  },
  {
    id: 4,
    packId: 1001,
    productId: 100,
    qty: 4,
  },
];

export const packProduct: PackProductEntity[] = [
  {
    packItemId: 1,
    packId: 1000,
    code: 100,
    name: 'SODA',
    costPrice: 10,
    salesPrice: 20,
    qty: 1,
  },
  {
    packItemId: 2,
    packId: 1000,
    code: 200,
    name: 'WATER',
    costPrice: 5,
    salesPrice: 10,
    qty: 2,
  },
  {
    packItemId: 3,
    packId: 1001,
    code: 300,
    name: 'BEER',
    costPrice: 15,
    salesPrice: 30,
    qty: 3,
  },
  {
    packItemId: 4,
    packId: 1001,
    code: 100,
    name: 'SODA',
    costPrice: 10,
    salesPrice: 20,
    qty: 4,
  },
];

export const packsWithoutProducts: ProductEntity[] = [
  {
    code: 1000,
    name: 'PACK 1',
    costPrice: new Prisma.Decimal(15),
    salesPrice: new Prisma.Decimal(40),
  },
  {
    code: 1001,
    name: 'PACK 2',
    costPrice: new Prisma.Decimal(85),
    salesPrice: new Prisma.Decimal(170),
  },
];

export const packWithProducts: PackEntity[] = [
  {
    code: 1000,
    name: 'PACK 1',
    costPrice: 15,
    salesPrice: 40,
    products: [packProduct[0], packProduct[1]],
  },
  {
    code: 1001,
    name: 'PACK 2',
    costPrice: 85,
    salesPrice: 170,
    products: [packProduct[2], packProduct[3]],
  },
];

export const invalidProductUpdateMock: UpdatePriceEntity[] = [
  {
    code: 100,
    name: 'SODA',
    currentPrice: 20,
    newPrice: 25,
    message: ['A variação de preço não pode ser superior à 10%.'],
    valid: false,
  },
  {
    code: 200,
    name: 'WATER',
    currentPrice: 10,
    newPrice: 11,
    message: ['A variação de preço não pode ser superior à 10%.'],
    valid: false,
  },
];

export const validatedProducsMock: UpdatePriceEntity[] = [
  { code: 16, name: 'SODA', currentPrice: 20, newPrice: 2, valid: true },
  {
    code: 1000,
    name: 'PACK 1',
    currentPrice: 40,
    newPrice: 41,
    valid: false,
    message: ['message'],
  },
  { code: 100, name: 'SODA', currentPrice: 10, newPrice: 10.5, valid: true },
  { code: 200, name: 'WATER', currentPrice: 5, newPrice: 5.3, valid: true },
  {
    code: 1001,
    name: 'PACK 2',
    currentPrice: 50,
    newPrice: 100,
    valid: false,
    message: ['A variação de preço não pode ser superior à 10%.', 'message'],
  },
];
