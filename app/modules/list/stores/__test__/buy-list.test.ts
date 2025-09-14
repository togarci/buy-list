import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBuyListStore } from '../buy-list';

describe('useBuyListStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('inicia com lista vazia', () => {
    const store = useBuyListStore();
    expect(store.listItems).toEqual([]);
  });

  it('define a lista com setListItems', () => {
    const store = useBuyListStore();
    const items = [
      {
        id: 1,
        product: { name: 'Arroz', category: 'Nao perecivel', type: 'Unidade', shortType: 'Un' },
        price: 10,
        quantity: 1,
        totalPrice: 10,
        checked: false,
      },
      {
        id: 2,
        product: { name: 'Feijão', category: 'Nao perecivel', type: 'Unidade', shortType: 'Un' },
        price: 8,
        quantity: 1,
        totalPrice: 8,
        checked: false,
      },
    ];
    store.setListItems(items);
    expect(store.listItems).toEqual(items);
  });

  it('adiciona item na lista', () => {
    const store = useBuyListStore();
    const item = {
      id: 1,
      product: { name: 'Arroz', category: 'Nao perecivel', type: 'Unidade', shortType: 'Un' },
      price: 10,
      quantity: 1,
      totalPrice: 10,
      checked: false,
    };
    store.addToList(item);
    expect(store.listItems).toContainEqual(item);
  });

  it('remove item da lista pelo id', () => {
    const store = useBuyListStore();
    const item1 = {
      id: 1,
      product: { name: 'Arroz', category: 'Nao perecivel', type: 'Unidade', shortType: 'Un' },
      price: 10,
      quantity: 1,
      totalPrice: 10,
      checked: false,
    };
    const item2 = {
      id: 2,
      product: { name: 'Feijão', category: 'Nao perecivel', type: 'Unidade', shortType: 'Un' },
      price: 8,
      quantity: 1,
      totalPrice: 8,
      checked: false,
    };
    store.setListItems([item1, item2]);

    store.removeFromList(1);

    expect(store.listItems).toEqual([item2]);
  });

  it('limpa a lista com clearList', () => {
    const store = useBuyListStore();
    store.setListItems([
      {
        id: 1,
        product: { name: 'Arroz', category: 'Nao perecivel', type: 'Unidade', shortType: 'Un' },
        price: 10,
        quantity: 1,
        totalPrice: 10,
        checked: false,
      },
    ]);

    store.clearList();

    expect(store.listItems).toEqual([]);
  });
});
