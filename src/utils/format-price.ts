export function formatPrice(price: string | null | undefined) {
  if (!price) return 'Grátis'
  const cents = parseInt(price, 10)
  if (cents === 0) return 'Grátis'

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cents / 100)
}