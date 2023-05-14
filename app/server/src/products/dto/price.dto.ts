import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePriceDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsNumber()
  @IsNotEmpty()
  newPrice: number;
}
