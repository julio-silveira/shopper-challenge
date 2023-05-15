import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class ProductEntity {
  @ApiProperty({ example: 200, description: 'Código do produto', type: Number })
  code: number;

  @ApiProperty({
    type: String,
    description: 'Nome do produto',
    example: 'WATER',
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Preço de custo do produto',
    example: 20.0,
  })
  costPrice: Prisma.Decimal;

  @ApiProperty({
    type: Number,
    description: 'Preço de venda do produto',
    example: 30.0,
  })
  salesPrice: Prisma.Decimal;
}
