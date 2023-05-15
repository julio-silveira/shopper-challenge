import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePriceDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 200, description: 'Código do produto', type: Number })
  code: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 30.0,
    description: 'Novo preço do produto',
    type: Number,
  })
  newPrice: number;
}
