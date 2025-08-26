<script lang="ts" setup>
import { useBuyListStore } from '~/modules/list/stores/buy-list';
import type { buyItem } from '~/share/types';
import { currencyBRLMask } from '~/utils/currency-brl';

const buyListStore = useBuyListStore();
const lenCategory = ref(0);

const model = defineModel();

const props = defineProps<{
  showItems?: boolean;
  listName?: string;
  listItems: buyItem[];
  variant?: 'borderless';
}>();

watch(
  () => props.listItems,
  (newList) => {
    const filteredCategories = newList.reduce((acc, item) => {
      if (!acc.includes(item.product.category)) {
        acc.push(item.product.category);
      }
      return acc;
    }, [] as string[]);

    lenCategory.value = filteredCategories.length;
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="flex flex-col border border-gray-200 p-3.5 gap-3 w-full rounded-xl">
    <div class="flex w-full h-min cursor-pointer gap-3 items-center">
      <div class="size-12 bg-gray-100 flex justify-center items-center rounded-xl">
        <Icon name="mdi:file-document-outline" class="text-2xl text-gray-700" />
      </div>

      <div class="flex flex-1 flex-col gap-1.5">
        <input
          v-if="showItems"
          type="text"
          v-model="model"
          class="font-bold text-sm placeholder:text-black"
          placeholder="Nome da Lista"
        />

        <p v-else class="font-bold text-sm line-clamp-1">{{ listName }}</p>

        <span class="text-xs font-medium text-gray-600"
          >{{ lenCategory }} categoria / {{ props.listItems.length }} item</span
        >
      </div>

      <template v-if="showItems">
        <Icon name="material-symbols:arrow-back-ios-new-rounded" class="text-xl text-gray-700 rotate-180" />
      </template>
    </div>

    <template v-if="showItems && buyListStore.listItems.length > 0">
      <hr class="w-full h-px text-gray-200" />

      <div class="flex flex-col gap-2 w-full">
        <ul class="flex flex-col gap-2">
          <li v-for="item in buyListStore.listItems" :key="item.id">
            <div class="flex justify-between">
              <div class="flex items-center gap-2">
                <img class="size-8" v-if="item.product.image" :src="item.product.image" alt="product image" />
                <div v-else class="size-8 rounded-md bg-gray-100 flex items-center justify-center">
                  <Icon name="material-symbols:token" class="text-lg" />
                </div>

                <p class="font-bold text-sm line-clamp-1">{{ item.product.name }}</p>
              </div>

              <div class="flex items-center gap-2">
                <p class="text-sm text-gray-600 capitalize">
                  {{ currencyBRLMask(item.price) }} / {{ item.product.shortType }}
                </p>

                <Icon
                  @click="() => buyListStore.removeFromList(item.id)"
                  name="material-symbols:close"
                  class="text-red-600 text-xl cursor-pointer"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
