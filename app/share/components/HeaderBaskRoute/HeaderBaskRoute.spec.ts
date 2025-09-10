import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderBaskRoute from './index.vue'

describe('HeaderBaskRoute.vue', () => {
  it('renders label and id correctly', () => {
    const wrapper = mount(HeaderBaskRoute, {
      props: {
        label: 'Voltar',
        id: 'back-btn'
      }
    })

    expect(wrapper.find('button').attributes('id')).toBe('back-btn')
    expect(wrapper.text()).toContain('Voltar')
  })

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(HeaderBaskRoute, {
      props: {
        label: 'Voltar',
        id: 'back-btn'
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})