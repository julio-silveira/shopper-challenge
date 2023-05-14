import { UpdatePriceMock, packWithProducts } from '@Test/mocks/data';

import {
  checkPackContent,
  reducePackPrice,
  reducePriceList,
} from './pack.helpers';

describe('pack helpers', () => {
  const priceList = {
    pack: { code: 1000, newPrice: 41 },
    products: [
      { code: 100, newPrice: 80, qty: 1 },
      { code: 200, newPrice: 4, qty: 2 },
    ],
  };

  describe('checkPackContent', () => {
    it('should return true when pack is valid', () => {
      expect(
        checkPackContent(packWithProducts[0], UpdatePriceMock),
      ).toBeTruthy();
    });
    it('should return false when pack is invalid', () => {
      expect(
        checkPackContent(packWithProducts[1], UpdatePriceMock),
      ).toBeFalsy();
    });
  });

  describe('reducePriceList', () => {
    it('should return a new price list with pack and products', () => {
      const response = reducePriceList(packWithProducts[0], UpdatePriceMock);

      expect(response).toEqual(priceList);
    });
  });

  describe('reducePackPrice', () => {
    it('should return a new price for pack', () => {
      expect(reducePackPrice(priceList)).toBe(88);
    });
  });
});
