import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomQuantity from './index.vue';

describe('CustomQuantity.vue', () => {
  it('renders label and error', () => {
    const wrapper = mount(CustomQuantity, {
      props: {
        label: 'Quantidade',
        name: 'qtd',
        error: 'Campo obrigatório',
        modelValue: 1,
      },
    });
    expect(wrapper.text()).toContain('Quantidade');
    expect(wrapper.text()).toContain('Campo obrigatório');
  });

  it('increments and decrements quantity', async () => {
    const wrapper = mount(CustomQuantity, {
      props: {
        name: 'qtd',
        modelValue: 2,
      },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('2');

    await wrapper.find('[data-testId="quantity-input-increase"]').trigger('click');
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(3);

    await wrapper.find('[data-testId="quantity-input-decrease"]').trigger('click');
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue'][1][0]).toBe(2);
  });

  it('does not decrement below 1', async () => {
    const wrapper = mount(CustomQuantity, {
      props: {
        name: 'qtd',
        modelValue: 1,
      },
    });

    const minusBtn = wrapper.find('[data-testId="quantity-input-decrease"]');
    expect(minusBtn?.attributes('disabled')).toBeDefined();
    await minusBtn?.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
  });

  it('sets quantity to 1 on blur if empty or zero', async () => {
    const wrapper = mount(CustomQuantity, {
      props: {
        name: 'qtd',
        modelValue: 0,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('blur');
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(1);
  });
});
