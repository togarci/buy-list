interface Props {
  listItem: {
    id: string;
    price: number;
    totalPrice: number;
    quantity: number;
    product: {
      name: string;
      category: string;
      subCategory: string;
      type: string;
      shortType: string;
    };
  };
}

export const useBuyList = defineStore('buyList', () => {
  const listItems = ref<Props['listItem'][]>([]);

  function setListItems(data: Props['listItem'][]) {
    listItems.value = data;
  }

  function addToList(item: Props['listItem']) {
    listItems.value.push(item);
  }

  function removeFromList(id: string) {
    listItems.value = listItems.value.filter((item) => item.id !== id);
  }

  return { listItems, setListItems, addToList, removeFromList };
});
