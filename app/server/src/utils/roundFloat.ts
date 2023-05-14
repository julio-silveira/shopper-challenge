export const roundFloat = (value: number, decimalPlaces = 2) =>
  Math.round(value * 10 ** decimalPlaces) / 10 ** decimalPlaces;
