import { PackProductEntity } from '../entities/pack-product.entity';
import { PackEntity } from '../entities/pack.entity';
import { ProductEntity } from '../entities/product.entity';

export class PackMapper {
  static withProducts(
    pack: ProductEntity,
    products: PackProductEntity[],
  ): PackEntity {
    return {
      code: pack.code,
      name: pack.name,
      costPrice: pack.costPrice.toNumber(),
      salesPrice: pack.salesPrice.toNumber(),
      products,
    };
  }
}
