import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimaryButton from './index.vue'

describe('PrimaryButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(PrimaryButton, {
      slots: {
        default: 'Clique aqui'
      }
    })
    expect(wrapper.text()).toContain('Clique aqui')
  })

  it('sets button type from prop', () => {
    const wrapper = mount(PrimaryButton, {
      props: {
        type: 'submit'
      }
    })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(PrimaryButton)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})