<script lang="ts" setup>
import { useBuyListStore } from '~/modules/create/stores/buy-list';
import type { buyItem } from '~/share/types';
import { currencyBRLMask } from '~/utils/currency-brl';

const buyListStore = useBuyListStore();
const lenCategory = ref(0);
const isOpenActions = ref(false);

const model = defineModel();

const props = defineProps<{
  showItems?: boolean;
  editionMode?: boolean;
  showActions?: boolean;
  listName?: string;
  listItems: buyItem[];
}>();

const emits = defineEmits(['delete', 'edit', 'view']);

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
  <div
    @click="
      () => {
        if (showActions) isOpenActions = !isOpenActions;
      }
    "
    class="flex flex-col border border-gray-200 p-3.5 w-full rounded-xl"
    :class="{ 'gap-3': (showActions && isOpenActions) || editionMode }"
  >
    <div class="flex w-full h-min cursor-pointer gap-3 items-center">
      <div class="size-12 bg-gray-100 flex justify-center items-center rounded-xl">
        <Icon name="mdi:file-document-outline" class="text-2xl text-gray-700" />
      </div>

      <div class="flex flex-1 flex-col gap-1.5">
        <input
          v-if="editionMode"
          type="text"
          v-model="model"
          class="font-bold text-sm placeholder:text-black"
          placeholder="Lista"
        />

        <p v-else class="font-bold text-sm line-clamp-1">{{ listName }}</p>

        <span class="text-xs font-medium text-gray-600"
          >{{ lenCategory }} categoria / {{ props.listItems.length }} item</span
        >
      </div>

      <div class="ease-linear transition-all" :class="{ 'rotate-90': isOpenActions, 'rotate-0': !isOpenActions }">
        <Icon name="material-symbols:arrow-back-ios-new-rounded" class="text-xl text-gray-700 rotate-180" />
      </div>
    </div>

    <template v-if="showActions">
      <div
        class="w-full flex gap-2.5 items-center overflow-hidden transition-all"
        :class="{ 'h-0': !isOpenActions, 'h-5': isOpenActions }"
      >
        <button
          @click="emits('view')"
          class="cursor-pointer text-green-900 text-xs h-min bg-green-300 px-3 rounded-lg py-0.5"
        >
          Ver
        </button>
        <button
          @click="emits('edit')"
          class="cursor-pointer text-blue-900 text-xs h-min bg-blue-300 rounded-lg py-0.5 px-3"
        >
          Editar
        </button>
        <button
          @click="emits('delete')"
          class="cursor-pointer text-red-900 bg-red-300 h-min text-xs px-3 py-0.5 rounded-lg"
        >
          Deletar
        </button>
      </div>
    </template>

    <template v-if="editionMode && buyListStore.listItems.length > 0">
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
