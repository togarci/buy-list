import type { dataList } from '../types';

export const useDataListStore = defineStore(
  'dataList',
  () => {
    const dataList = ref<dataList[]>([]);

    function addToData(data: dataList) {
      const uuid = crypto.randomUUID();
      if (!data.name) data.name = `Lista ${uuid}`;

      dataList.value.push({ ...data, id: uuid });
    }

    function updateData(id?: string, list?: dataList) {
      if (!id || !list) return;

      dataList.value.forEach((item) => {
        if (item.id === id) {
          item.name = list.name;
          item.data = list.data;
        }
      });
    }

    function removeFromData(id?: string | number) {
      if (!id) return;

      dataList.value = dataList.value.filter((item) => item.id !== id);
    }

    return { dataList, addToData, removeFromData, updateData };
  },
  { persist: true }
);
