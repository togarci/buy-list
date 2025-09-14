import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomSelect from './index.vue';

const Icon = {
  template: '<span class="iconify" />',
  props: ['name', 'class'],
};

const options = [
  { label: 'Opção 1', value: 1 },
  { label: 'Opção 2', value: 2 },
];

describe('CustomSelect.vue', () => {
  it('renders label, placeholder and error', () => {
    const wrapper = mount(CustomSelect, {
      props: {
        label: 'Selecione',
        name: 'select',
        placeholder: 'Escolha uma opção',
        error: 'Campo obrigatório',
        options,
        modelValue: null,
      },
      global: { components: { Icon } },
    });
    expect(wrapper.text()).toContain('Selecione');
    expect(wrapper.text()).toContain('Escolha uma opção');
    expect(wrapper.text()).toContain('Campo obrigatório');
  });

  it('shows selected option label when model is set', () => {
    const wrapper = mount(CustomSelect, {
      props: {
        label: 'Selecione',
        name: 'select',
        placeholder: 'Escolha uma opção',
        error: '',
        options,
        modelValue: 2,
      },
      global: { components: { Icon } },
    });
    expect(wrapper.text()).toContain('Opção 2');
  });

  it('opens options and selects an option', async () => {
    const wrapper = mount(CustomSelect, {
      props: {
        label: 'Selecione',
        name: 'select',
        placeholder: 'Escolha uma opção',
        error: '',
        options,
        modelValue: null,
      },
      global: { components: { Icon } },
    });

    await wrapper.find('.w-full').trigger('click');
    const openSelect = wrapper.find('[data-testId="open-select-click"]');
    await openSelect.trigger('click');

    expect(wrapper.findAll('button').length).toBe(2);

    const button = wrapper.find('[data-testid="option-select-1"]');
    await button.trigger('click');
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(2);
  });

  it('does not open select when disabled', async () => {
    const wrapper = mount(CustomSelect, {
      props: {
        label: 'Selecione',
        name: 'select',
        placeholder: 'Escolha uma opção',
        error: '',
        options,
        modelValue: null,
        disabled: true,
      },
      global: { components: { Icon } },
    });

    await wrapper.find('.w-full').trigger('click');
    expect(wrapper.findAll('button').length).toBe(0);
  });
});
