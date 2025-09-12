import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomCheckbox from './index.vue';

const IconStub = {
  template: '<span class="iconify" />',
  props: ['name', 'class'],
};

describe('CustomCheckbox.vue', () => {
  it('shows check icon when model is true', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: { modelValue: true },
      global: { components: { Icon: IconStub } },
    });
    expect(wrapper.find('.iconify').exists()).toBe(true);
  });

  it('does not show check icon when model is false', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: { modelValue: false },
      global: { components: { Icon: IconStub } },
    });
    expect(wrapper.find('.iconify').exists()).toBe(false);
  });

  it('toggles model value when clicked', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: { modelValue: false },
      global: { components: { Icon: IconStub } },
    });

    await wrapper.trigger('click');
    //@ts-ignore
    expect(wrapper.emitted()['update:modelValue']?.[0][0]).toBe(true);

    await wrapper.setProps({ modelValue: true });
    await wrapper.trigger('click');
    //@ts-ignore
    expect(wrapper.emitted()['update:modelValue']?.[1][0]).toBe(false);
  });
});
