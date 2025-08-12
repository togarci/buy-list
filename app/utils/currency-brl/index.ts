export const currencyBRLMask = (
  value: number,
  isWithoutSymbol?: boolean
): string => {
  value = value || 0;
  const transformedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
  if (isWithoutSymbol) {
    return transformedValue.replace('R$ ', '');
  }
  return transformedValue;
};
