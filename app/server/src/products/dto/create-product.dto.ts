import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O código é obrigatório' })
  @IsNumber({}, { message: 'O código deve ser um número' })
  code: number;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'O preço de custo é obrigatório' })
  @IsNumber({}, { message: 'O preço de custo deve ser um número' })
  costPrice: number;

  @IsNotEmpty({ message: 'O preço de venda é obrigatório' })
  @IsNumber({}, { message: 'O preço de venda deve ser um número' })
  salesPrice: number;
}
