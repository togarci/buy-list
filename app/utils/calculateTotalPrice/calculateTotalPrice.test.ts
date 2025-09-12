import { describe, it, expect } from 'vitest';
import calculateTotalPrice from '.';

describe('calculateTotalPrice', () => {
  it('calculates the total price correctly with whole numbers', () => {
    expect(calculateTotalPrice(10, 2)).toBe(20);
  });

  it('round the price correctly before multiplying', () => {
    expect(calculateTotalPrice(10.345, 2)).toBe(20.69);
  });

  it('returns two decimal places and rounds price', () => {
    expect(calculateTotalPrice(11.542, 3)).toBe(34.63);
  });

  it('returns 0 if quantity is 0', () => {
    expect(calculateTotalPrice(15.5, 0)).toBe(0);
  });

  it('works with large values', () => {
    expect(calculateTotalPrice(9999.99, 10)).toBe(99999.9);
  });

  it('keeps a maximum of two decimal places', () => {
    const result = calculateTotalPrice(2.3333, 3);
    expect(result).toBeCloseTo(7, 2);
  });
});
