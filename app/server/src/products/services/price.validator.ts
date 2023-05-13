export class PriceValidator {
  private costPrice: number;
  private currentPrice: number;
  private newPrice: number;
  private priceDifference: number;
  private priceDifferencePercentage: number;
  private maxPriceDifferencePercentage = 10;
  private minPriceDifferencePercentage = -10;
  constructor({
    costPrice: costPrice,
    currentPrice,
    newPrice,
  }: {
    costPrice: string;
    currentPrice: string;
    newPrice: string;
  }) {
    this.costPrice = +costPrice;
    this.currentPrice = +currentPrice;
    this.newPrice = +newPrice;
    this.priceDifference = this.newPrice - this.currentPrice;
    this.priceDifferencePercentage =
      (this.priceDifference / this.currentPrice) * 100;
  }

  validatePriceVariation(): boolean {
    const isInPriceRange =
      this.priceDifferencePercentage > this.maxPriceDifferencePercentage ||
      this.priceDifferencePercentage < -this.minPriceDifferencePercentage;

    return isInPriceRange;
  }

  validateFloorPrice(): boolean {
    return this.newPrice < this.costPrice;
  }
}
