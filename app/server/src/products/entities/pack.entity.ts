import { PackProductEntity } from './pack-product.entity';

export class PackEntity {
  code: number;
  name: string;
  costPrice: number;
  salesPrice: number;
  products?: PackProductEntity[];
}
