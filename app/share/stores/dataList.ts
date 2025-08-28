import type { dataList } from '../types';

export const useDataListStore = defineStore(
  'dataList',
  () => {
    const dataList = ref<dataList[]>([]);

    function addToData(item: dataList) {
      const uuid = crypto.randomUUID();
      if (!item.name) item.name = `Lista ${uuid}`;

      dataList.value.push({ ...item, id: uuid });
    }

    function removeFromData(id?: string | number) {
      if (!id) return;

      dataList.value = dataList.value.filter((item) => item.id !== id);
    }

    return { dataList, addToData, removeFromData };
  },
  { persist: true }
);
