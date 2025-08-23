export const typingPriceMask = (value?: string) => {
  if (!value) return '';

  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  value = value.replace(/\D/g, '').padStart(2, '0');
  const numberValue = parseFloat(value) / 100;
  return formatter.format(numberValue);
};
