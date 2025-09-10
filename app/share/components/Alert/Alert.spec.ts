import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Alert from './index.vue';

describe('Alert.vue', () => {
  it('renders title, description and ctaLabel', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'Teste de título',
        description: 'Descrição do alerta',
        ctaLabel: 'Confirmar',
        modelValue: true,
      },
    });

    expect(wrapper.text()).toContain('Atenção!');
    expect(wrapper.text()).toContain('Teste de título');
    expect(wrapper.text()).toContain('Descrição do alerta');
    expect(wrapper.text()).toContain('Confirmar');
  });

  it('emits handleSubmit when button is clicked', async () => {
    const wrapper = mount(Alert, {
      props: {
        ctaLabel: 'OK',
        modelValue: true,
      },
    });

    await wrapper.findComponent({ name: 'PrimaryButton' }).trigger('click');
    expect(wrapper.emitted('handleSubmit')).toBeTruthy();
  });

  it('does not render when isOpenAlert is false', () => {
    const wrapper = mount(Alert, {
      props: {
        modelValue: false,
      },
    });
    expect(wrapper.find('div').exists()).toBe(false);
  });
});
