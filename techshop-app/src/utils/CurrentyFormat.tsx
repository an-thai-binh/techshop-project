export function formatVietNamCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}
export function formatPrice(value: string | number): string {
  const number = typeof value === 'string' ? parseInt(value, 10) : value
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(number)
}
