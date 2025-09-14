import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomInput from './index.vue';

describe('CustomInput.vue', () => {
  it('renders label and error', () => {
    const wrapper = mount(CustomInput, {
      props: {
        label: 'Preço',
        name: 'preco',
        error: 'Campo obrigatório',
      },
    });
    expect(wrapper.text()).toContain('Preço');
    expect(wrapper.text()).toContain('Campo obrigatório');
  });

  it('renders price input with mask and updates model', async () => {
    const wrapper = mount(CustomInput, {
      props: {
        variant: 'price',
        name: 'preco',
        error: '',
        modelValue: '0',
      },
    });

    const input = wrapper.find('input[data-testId="custom-price-input"]');
    await input.setValue('1234');
    await input.trigger('input');

    // @ts-ignore
    expect(input.element.value).toBe('12,34');

    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe('12.34');
  });

  it('renders normal input when variant is not price', () => {
    const wrapper = mount(CustomInput, {
      props: {
        name: 'nome',
        error: '',
        modelValue: 'teste',
      },
    });
    const input = wrapper.find('input[data-testId="custom-text-input"]');
    expect(input.exists()).toBe(true);
    // @ts-ignore
    expect(input.element.value).toBe('teste');
  });
});
