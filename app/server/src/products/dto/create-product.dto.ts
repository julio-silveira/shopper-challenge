import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 200, description: 'Código do produto' })
  @IsNotEmpty({ message: 'O código é obrigatório' })
  @IsNumber({}, { message: 'O código deve ser um número' })
  code: number;

  @ApiProperty({ example: 'WATER', description: 'Nome do produto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @ApiProperty({ example: 20.0, description: 'Preço de custo do produto' })
  @IsNotEmpty({ message: 'O preço de custo é obrigatório' })
  @IsNumber({}, { message: 'O preço de custo deve ser um número' })
  costPrice: number;

  @ApiProperty({ example: 30.0, description: 'Preço de venda do produto' })
  @IsNotEmpty({ message: 'O preço de venda é obrigatório' })
  @IsNumber({}, { message: 'O preço de venda deve ser um número' })
  salesPrice: number;
}
