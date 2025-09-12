import { describe, it, expect } from 'vitest';
import { currencyBRLMask } from '.';

describe('currencyBRLMask', () => {
  it('Formats integer with R$ symbol', () => {
    expect(currencyBRLMask(1000)).toBe('R$ 1.000,00');
  });

  it('Formats decimal number correctly', () => {
    expect(currencyBRLMask(1234.56)).toBe('R$ 1.234,56');
  });

  it('Formats 0 as R$ 0.00', () => {
    expect(currencyBRLMask(0)).toBe('R$ 0,00');
  });

  it('Removes R$ symbol when isWithoutSymbol is true', () => {
    expect(currencyBRLMask(789.5, true)).toBe('789,50');
  });

  it('Formats large values', () => {
    expect(currencyBRLMask(1000000)).toBe('R$ 1.000.000,00');
  });

  it('Uses 0 as default value if undefined is received', () => {
    // @ts-expect-error
    expect(currencyBRLMask(undefined)).toBe('R$ 0,00');
  });
});
