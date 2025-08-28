<script lang="ts" setup>
import { currencyBRLMask } from '~/utils/currencyBRL';

defineProps<{
  name: string;
  price: number;
  shortType: string;
}>();

const quantity = defineModel('quantity');
const checked = defineModel('checked');

const quantityRef = ref<any>(null);

const handleClick = (evt: PointerEvent) => {
  const event = evt.target;
  if (!quantityRef.value.contains(event)) checked.value = !checked.value;
};
</script>

<template>
  <div @click="(evt: any) => handleClick(evt)" class="w-full items-center justify-between flex">
    <div class="flex items-center gap-4">
      <CustomCheckbox v-model="checked" />
      <p class="text-sm font-bold line-clamp-1" :class="{ 'opacity-60 line-through': checked }">
        {{ name }}
      </p>
    </div>

    <div class="flex items-center gap-4">
      <div class="capitalize font-medium text-xs text-gray-600 flex items-center gap-1">
        <span>
          {{ currencyBRLMask(price) }}
        </span>
        /
        <span>{{ shortType }}</span>
      </div>

      <div ref="quantityRef">
        <CustomQuantity variant="rounded" :name="`quantity-${name.replaceAll(' ', '-')}`" v-model="quantity" />
      </div>
    </div>
  </div>
</template>
