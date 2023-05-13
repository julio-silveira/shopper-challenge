import { Prisma } from '@prisma/client';

export class ProductEntity {
  code: number;
  name: string;
  costPrice: Prisma.Decimal;
  salesPrice: Prisma.Decimal;
}
