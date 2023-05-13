import { PriceValidatorConstructorParams } from '../interfaces/price-validator.interface';
import { PriceValidator } from './price.validator';

const pricesMock: PriceValidatorConstructorParams[] = [
  {
    currentPrice: 10,
    newPrice: 11,
    costPrice: 5,
  },
  {
    currentPrice: 10,
    newPrice: 9,
    costPrice: 5,
  },
  {
    currentPrice: 10,
    newPrice: 15,
    costPrice: 5,
  },
  {
    currentPrice: 5,
    newPrice: 4,
    costPrice: 5,
  },
];

describe('PriceValidator', () => {
  describe('constructor', () => {
    it('should set the costPrice, currentPrice, newPrice, priceDifference, priceDifferencePercentage and maxPriceDifferencePercentage', () => {
      const priceValidator = new PriceValidator(pricesMock[0]);
      expect(priceValidator).toEqual({
        costPrice: 5,
        currentPrice: 10,
        newPrice: 11,
        priceDifference: 1,
        priceDifferencePercentage: 10,
        maxPriceDifferencePercentage: 10,
      });
    });
  });

  describe('validatePriceVariation', () => {
    it('should return true when receive range above 10%', () => {
      const priceValidator = new PriceValidator(pricesMock[0]);
      expect(priceValidator.validatePriceVariation()).toBe(true);
    });
    it('should return true when receive range below -10%', () => {
      const priceValidator = new PriceValidator(pricesMock[1]);
      expect(priceValidator.validatePriceVariation()).toBe(true);
    });
    it('should return false when receive range between -10% and 10%', () => {
      const priceValidator = new PriceValidator(pricesMock[2]);
      expect(priceValidator.validatePriceVariation()).toBe(false);
    });
  });

  describe('validateFloorPrice', () => {
    it('should return true when receive price below cost price', () => {
      const priceValidator = new PriceValidator(pricesMock[3]);
      expect(priceValidator.validateFloorPrice()).toBe(true);
    });
    it('should return false when receive price above cost price', () => {
      const priceValidator = new PriceValidator(pricesMock[0]);
      expect(priceValidator.validateFloorPrice()).toBe(false);
    });
  });
});
