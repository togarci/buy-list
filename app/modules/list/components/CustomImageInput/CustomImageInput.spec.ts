import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomImageInput from './index.vue';

const Icon = {
  template: '<span class="iconify" />',
  props: ['name', 'class'],
};

vi.mock('vue3-toastify', () => {
  return {
    toast: {
      error: vi.fn(),
      POSITION: { TOP_CENTER: 'top-center' },
    },
  };
});

import { toast } from 'vue3-toastify';

describe('CustomImageInput.vue', () => {
  it('renders upload instructions when no value', () => {
    const wrapper = mount(CustomImageInput, {
      props: { value: '', limitMbSize: 1 },
      global: { components: { Icon } },
    });
    expect(wrapper.text()).toContain('Clique aqui para fazer o upload do arquivo');
  });

  it('renders image when value is set', () => {
    const wrapper = mount(CustomImageInput, {
      props: { value: 'image-url-fake', limitMbSize: 1 },
      global: { components: { Icon } },
    });
    expect(wrapper.find('img').attributes('src')).toBe('image-url-fake');
  });

  it('emits input with empty string when remove button is clicked', async () => {
    const wrapper = mount(CustomImageInput, {
      props: { value: 'image-url-fake', limitMbSize: 1 },
      global: { components: { Icon } },
    });
    await wrapper.find('button').trigger('click');
    // @ts-ignore
    expect(wrapper.emitted('input')[0][0]).toBe('');
  });

  it('shows toast error when file size exceeds limit', async () => {
    const wrapper = mount(CustomImageInput, {
      props: { value: '', limitMbSize: 1 },
      global: { components: { Icon } },
    });
    const input = wrapper.find('input[type="file"]');
    const exceedsFileFake = new File(['a'.repeat(2 * 1024 * 1024)], 'exceeds-image-fake.png', { type: 'image/png' });
    // @ts-ignore
    input.element.files = [exceedsFileFake];
    await input.trigger('change');

    expect(toast.error).toHaveBeenCalled();
    expect(wrapper.emitted('input')).toBeFalsy();
  });

  it('emits input with file url when file is valid', async () => {
    const wrapper = mount(CustomImageInput, {
      props: { value: '', limitMbSize: 2 },
      global: { components: { Icon } },
    });
    const input = wrapper.find('input[type="file"]');
    const file = new File(['a'.repeat(1024)], 'small-image-size.png', { type: 'image/png' });
    const urlMock = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    // @ts-ignore
    input.element.files = [file];
    await input.trigger('change');

    // @ts-ignore
    expect(wrapper.emitted('input')[0][0]).toBe('blob:url');
    urlMock.mockRestore();
  });
});
