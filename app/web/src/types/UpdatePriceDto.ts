export type UpdatePriceDto = {
  products: {
    code: number
    newPrice: number
  }[]
}
