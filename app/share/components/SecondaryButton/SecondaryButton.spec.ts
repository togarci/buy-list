import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SecondaryButton from './index.vue';

describe('SecondaryButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(SecondaryButton, {
      slots: {
        default: 'Cancelar',
      },
    });
    expect(wrapper.text()).toContain('Cancelar');
  });

  it('sets button type from prop', () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        type: 'submit',
      },
    });
    expect(wrapper.find('button').attributes('type')).toBe('submit');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(SecondaryButton);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
