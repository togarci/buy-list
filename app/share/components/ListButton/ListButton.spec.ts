import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ListButton from './index.vue';

vi.mock('~/modules/list/stores/buy-list', () => ({
  useBuyListStore: () => ({
    listItems: [
      {
        id: '1',
        price: 10,
        totalPrice: 10,
        quantity: 1,
        checked: false,
        product: {
          name: 'Produto 1',
          category: 'Categoria A',
          type: 'unitario',
          shortType: 'un',
        },
      },
      {
        id: '2',
        price: 20,
        quantity: 2,
        totalPrice: 20,
        checked: true,
        product: {
          name: 'Produto 2',
          category: 'Categoria B',
          type: 'unitario',
          shortType: 'kg',
        },
      },
    ],
    removeFromList: vi.fn(),
  }),
}));

describe('ListButton.vue', () => {
  const listItems = [
    {
      id: '1',
      price: 10,
      totalPrice: 10,
      quantity: 1,
      checked: false,
      product: {
        name: 'Produto 1',
        category: 'Categoria A',
        type: 'unitario',
        shortType: 'un',
      },
    },
    {
      id: '2',
      price: 20,
      quantity: 2,
      totalPrice: 20,
      checked: true,
      product: {
        name: 'Produto 2',
        category: 'Categoria B',
        type: 'unitario',
        shortType: 'kg',
      },
    },
  ];

  it('renders listName and categories', () => {
    const wrapper = mount(ListButton, {
      props: {
        listName: 'Minha Lista',
        listItems,
        variant: 'borderless',
        showItems: false,
      },
    });

    expect(wrapper.text()).toContain('Minha Lista');
    expect(wrapper.text()).toContain('2 categoria / 2 item');
  });

  it('shows input when showItems is true', () => {
    const wrapper = mount(ListButton, {
      props: {
        listItems,
        showItems: true,
      },
    });

    expect(wrapper.find('input[placeholder="Nome da Lista"]').exists()).toBe(true);
  });

  it('emits actionUpdate and actionDelete when menu items are clicked', async () => {
    const wrapper = mount(ListButton, {
      props: {
        listItems,
        variant: 'borderless',
      },
    });

    await wrapper.find('button').trigger('click');

    const buttonEditMenu = await wrapper.findAll('li')[0];
    buttonEditMenu?.trigger('click');
    expect(wrapper.emitted('actionUpdate')).toBeTruthy();

    const buttonDeleteMenu = await wrapper.findAll('li')[1];
    buttonDeleteMenu?.trigger('click');
    expect(wrapper.emitted('actionDelete')).toBeTruthy();
  });

  it('renders items from buyListStore when showItems is true', () => {
    const wrapper = mount(ListButton, {
      props: {
        showItems: true,
        listItems: [],
      },
    });

    expect(wrapper.text()).toContain('Produto 1');
    expect(wrapper.text()).toContain('Produto 2');
    expect(wrapper.text()).toContain('un');
    expect(wrapper.text()).toContain('kg');
  });
});
