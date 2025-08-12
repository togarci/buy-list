<script setup lang="ts">
import { currencyBRLMask } from '~/utils/currency-brl';

const props = defineProps<{
  label?: string;
  name?: string;
  placeholder?: string;
  error: string | undefined;
  variant?: 'price';
}>();

const model = defineModel();

const handleInput = (e: Event) => {
  if (props.variant !== 'price') return;
  const target = e.target as HTMLInputElement;
  const value = Number(target?.value);

  if (value) {
    const formatted = currencyBRLMask(Number(target.value), true);
    target.value = formatted;
    model.value = formatted;
  }
};
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <label class="text-xs font-medium" :for="name?.replaceAll(' ', '-')">{{
      label
    }}</label>
    <div
      class="w-full flex gap-1.5 items-center rounded-lg h-12 py-2 px-4 border"
      :class="{ 'border-red-600': error, 'border-gray-200': !error }"
    >
      <span
        class="text-sm font-normal font-Montserrat"
        :class="{ 'text-gray-600/70': !model, 'text-black': model }"
        v-if="variant === 'price'"
        >R$</span
      >
      <input
        :id="name?.replaceAll(' ', '-')"
        type="text"
        :name="name"
        v-model="model"
        :placeholder="placeholder"
        @input="handleInput"
        class="size-full font-Montserrat text-black placeholder:text-600 font-normal text-sm"
      />
    </div>

    <span class="text-red-400 text-xs font-semibold">{{ error }}</span>
  </div>
</template>
