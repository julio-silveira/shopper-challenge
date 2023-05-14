import { UpdatePriceDto } from '@/products/dto/price.dto';
import { PackEntity } from '@/products/entities/pack.entity';
import { PriceUpdateInteface } from '@/products/interfaces/price-update.interface';

import { roundFloat } from './roundFloat';

export const checkPackContent = (
  pack: PackEntity,
  priceUpdateList: PriceUpdateInteface[],
): boolean => {
  return pack.products.every(
    (product) =>
      product.code === pack.code ||
      priceUpdateList.some((item) => item.code === product.code),
  );
};

export const reducePriceList = (
  pack: PackEntity,
  priceUpdateList: PriceUpdateInteface[],
) => {
  const prices = priceUpdateList.reduce(
    (acc, curr) => {
      if (curr.code === pack.code) {
        return { ...acc, pack: curr };
      }
      const currentProduct = pack.products.find((p) => p.code === curr.code);
      if (currentProduct) {
        return {
          ...acc,
          products: [...acc.products, { ...curr, qty: currentProduct.qty }],
        };
      }
      return acc;
    },
    { pack: null, products: [] },
  );
  return prices;
};

export const reducePackPrice = (newPack: {
  pack: UpdatePriceDto;
  products: { code: number; newPrice: number; qty: number }[];
}) =>
  roundFloat(
    newPack.products.reduce((acc, curr) => acc + curr.qty * curr.newPrice, 0),
  );
