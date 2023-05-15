export interface UpdatePriceEntity {
  code: number
  valid: boolean
  name?: string
  currentPrice?: number
  newPrice?: number
  message?: string[]
}
