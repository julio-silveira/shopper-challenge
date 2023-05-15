import { ApiProperty } from '@nestjs/swagger';

export class UpdatePriceEntity {
  @ApiProperty({ example: 200, description: 'Código do produto', type: Number })
  code: number;
  @ApiProperty({
    example: false,
    description: 'Indica se o produto passou por todas validaçoes',
    type: Boolean,
  })
  valid: boolean;

  @ApiProperty({
    example: 'WATER',
    description: 'Nome do produto',
    type: String,
  })
  name?: string;

  @ApiProperty({
    example: 20.0,
    description: 'Preço de atual do produto',
    type: Number,
  })
  currentPrice?: number;

  @ApiProperty({
    example: 19.0,
    description: 'Novo preço do produto',
    type: Number,
  })
  newPrice?: number;

  @ApiProperty({
    example: ['Preço atual é maior que o novo preço'],
    description: 'Mensagens de erro',
    required: false,
    type: [String],
  })
  message?: string[];
}
