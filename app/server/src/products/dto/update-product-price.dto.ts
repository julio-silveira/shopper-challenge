import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { UpdatePriceDto } from './price.dto';

export class UpdateProductPriceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePriceDto)
  @ApiProperty({ type: [UpdatePriceDto] })
  products: UpdatePriceDto[];
}
