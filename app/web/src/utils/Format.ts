export const toBrl = (currency: number | string | undefined) => {
  if (!currency) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(currency))
}
