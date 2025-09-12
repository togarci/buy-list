import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ListItem from './index.vue';

const CustomCheckbox = {
  template: '<input type="checkbox" />',
  props: ['modelValue'],
  emits: ['update:modelValue'],
};
const CustomQuantity = {
  template: '<input type="number" />',
  props: ['modelValue', 'variant', 'name'],
  emits: ['update:modelValue'],
};

vi.mock('~/utils/currencyBRL', () => ({
  currencyBRLMask: (v: number) => `R$ ${v.toFixed(2)}`,
}));

describe('ListItem.vue', () => {
  it('renders name, price, shortType and uses currencyBRLMask', () => {
    const wrapper = mount(ListItem, {
      props: {
        name: 'Arroz',
        price: 12.5,
        shortType: 'kg',
        quantity: 2,
        checked: false,
      },
      global: {
        components: {
          CustomCheckbox,
          CustomQuantity,
        },
      },
    });

    expect(wrapper.text()).toContain('Arroz');
    expect(wrapper.text()).toContain('R$ 12.50');
    expect(wrapper.text()).toContain('kg');
  });

  it('applies line-through and opacity when checked', async () => {
    const wrapper = mount(ListItem, {
      props: {
        name: 'Feijão',
        price: 8,
        shortType: 'kg',
        quantity: 1,
        checked: true,
      },
      global: {
        components: {
          CustomCheckbox,
          CustomQuantity,
        },
      },
    });

    const nameEl = wrapper.find('p');
    expect(nameEl.classes()).toContain('line-through');
    expect(nameEl.classes()).toContain('opacity-60');
  });
});
