import type { buyItem } from '~/share/types';

export const useBuyListStore = defineStore('buyList', () => {
  const listItems = ref<buyItem[]>([]);

  function setListItems(data: buyItem[]) {
    listItems.value = data;
  }

  function addToList(item: buyItem) {
    listItems.value.push(item);
  }

  function removeFromList(id: string | number) {
    listItems.value = listItems.value.filter((item) => item.id !== id);
  }

  function clearList() {
    listItems.value = [];
  }

  return { listItems, setListItems, addToList, removeFromList, clearList };
});
