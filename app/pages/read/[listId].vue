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

const handleUpdateData = () => {
  router.push(`/list/${listId}`);
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

    <div class="flex flex-col lg:flex-row lg:gap-5">
      <section
        class="flex h-min max-lg:pb-1.5 lg:p-3.5 rounded-xl lg:w-80 border-b lg:border border-gray-100 flex-col gap-5"
      >
        <ListButton
          @actionDelete="handleDeleteData"
          @actionUpdate="handleUpdateData"
          :listName="selectedList?.name"
          :listItems="selectedList?.data ?? []"
          variant="borderless"
        />

        <div class="flex justify-between items-center w-full font-bold text-sm">
          <p>Total do carrinho</p>
          <p>{{ currencyBRLMask(totalPrice) }}</p>
        </div>
      </section>

      <div class="mt-7 mr-2 max-lg:hidden">
        <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-gray-600 text-base" />
      </div>

      <section class="flex flex-col lg:border lg:p-5 lg:rounded-xl w-full lg:max-w-xl border-gray-100 gap-5">
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
    </div>
  </main>
</template>
