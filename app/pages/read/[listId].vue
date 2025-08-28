<script lang="ts" setup>
import type { dataList } from '~/share/types';
import { currencyBRLMask } from '~/utils/currencyBRL';
import { useDataListStore } from '~/share/stores/dataList';

import ListButton from '~/share/components/ListButton/index.vue';
import calculateTotalPrice from '~/utils/calculateTotalPrice';
import HeaderBackRoute from '~/share/components/HeaderBaskRoute/index.vue';

const route = useRoute();
const router = useRouter();

const listId = route.params.listId;

const totalPrice = ref(0);
const selectedList = ref<dataList>();
const allCategorys = ref<string[]>([]);

const dataListStore = useDataListStore();

const calcPrices = () => {
  totalPrice.value = 0;
  selectedList.value?.data.forEach((item) => {
    totalPrice.value += calculateTotalPrice(item.price, item.quantity) ?? 0;
  });
};

const handleSelectList = () => {
  if (listId) {
    selectedList.value = dataListStore.dataList.find((list) => list.id === listId);
    calcPrices();

    const filteredCategories = selectedList.value?.data.reduce((acc, item) => {
      if (!acc.includes(item.product.category)) {
        acc.push(item.product.category);
      }
      return acc;
    }, [] as string[]);
    allCategorys.value = filteredCategories ?? [];
  }
};

const handleDeleteData = () => {
  dataListStore.removeFromData(selectedList.value?.id);
  router.push('/');
};

watch(() => listId, handleSelectList);

watch(
  () => selectedList.value,
  () => calcPrices(),
  { deep: true }
);

onMounted(() => {
  handleSelectList();
});
</script>

<template>
  <main class="flex flex-col gap-5 p-5 xl:p-20">
    <HeaderBackRoute @click="router.push('/')" id="create_page_back_route" :label="`Lista ${selectedList?.name}`" />

    <section class="flex pb-1.5 border-b border-gray-100 flex-col gap-5">
      <ListButton
        @delete="handleDeleteData"
        :listName="selectedList?.name"
        :listItems="selectedList?.data ?? []"
        variant="borderless"
      />

      <div class="flex justify-between items-center w-full font-bold text-sm">
        <p>Total do carrinho</p>
        <p>{{ currencyBRLMask(totalPrice) }}</p>
      </div>
    </section>

    <section class="flex flex-col gap-5">
      <template v-for="category in allCategorys">
        <p class="text-xs font-medium">{{ category }}</p>

        <div class="flex gap-1.5 flex-col">
          <ListItem
            v-for="item in selectedList?.data.filter((sList) => sList.product.category === category)"
            :name="item.product.name"
            :price="item.price"
            :shortType="item.product.shortType"
            v-model:quantity="item.quantity"
            v-model:checked="item.checked"
          />
        </div>
      </template>
    </section>
  </main>
</template>
