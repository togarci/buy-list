import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDataListStore } from '../dataList';

describe('useDataListStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('adds a new data list', () => {
    const store = useDataListStore();
    store.addToData({ name: 'Minha Lista', data: [] });
    expect(store.dataList.length).toBe(1);
    expect(store.dataList[0]?.name).toBe('Minha Lista');
    expect(store.dataList[0]?.id).toBeDefined();
  });

  it('generates a name if not provided', () => {
    const store = useDataListStore();
    store.addToData({ name: '', data: [] });
    expect(store.dataList[0]?.name).toMatch(/^Lista /);
  });

  it('updates a data list', () => {
    const store = useDataListStore();
    store.addToData({ name: 'Original', data: [] });
    const id = store.dataList[0]?.id;

    const mockData = {
      id: 'item1',
      price: 0,
      totalPrice: 0,
      quantity: 0,
      checked: false,
      product: {
        image: undefined,
        name: '',
        category: '',
        subCategory: undefined,
        type: '',
        shortType: '',
      },
    };
    store.updateData(id, { name: 'Atualizado', data: [mockData] });
    expect(store.dataList[0]?.name).toBe('Atualizado');
    expect(store.dataList[0]?.data).toEqual([mockData]);
  });

  it('removes a data list', () => {
    const store = useDataListStore();
    store.addToData({ name: 'Remover', data: [] });
    const id = store.dataList[0]?.id;
    store.removeFromData(id);
    expect(store.dataList.length).toBe(0);
  });

  it('does nothing if removeFromData called without id', () => {
    const store = useDataListStore();
    store.addToData({ name: 'Teste', data: [] });
    store.removeFromData();
    expect(store.dataList.length).toBe(1);
  });
});
