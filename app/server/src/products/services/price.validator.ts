import { PriceValidatorConstructorParams } from '../interfaces/price-validator.interface';

export class PriceValidator {
  private costPrice: number;
  private currentPrice: number;
  private newPrice: number;
  private priceDifference: number;
  private priceDifferencePercentage: number;
  private maxPriceDifferencePercentage = 10;

  constructor({
    costPrice: costPrice,
    currentPrice,
    newPrice,
  }: PriceValidatorConstructorParams) {
    this.costPrice = costPrice;
    this.currentPrice = currentPrice;
    this.newPrice = newPrice;
    this.priceDifference = this.newPrice - this.currentPrice;
    this.priceDifferencePercentage = Math.abs(
      (this.priceDifference / this.currentPrice) * 100,
    );
  }

  validatePriceVariation(): boolean {
    const isInPriceRange =
      this.priceDifferencePercentage <= this.maxPriceDifferencePercentage;

    return isInPriceRange;
  }

  validateFloorPrice(): boolean {
    return this.newPrice < this.costPrice;
  }
}
