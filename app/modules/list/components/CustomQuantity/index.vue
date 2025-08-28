<script lang="ts" setup>
const { variant = 'default' } = defineProps<{
  variant?: 'rounded' | 'default';
  name: string;
  label?: string;
  error?: string | undefined;
}>();

const model = defineModel();

const increment = () => {
  if (model.value && typeof model.value === 'number') model.value += 1;
};

const decrease = () => {
  if (model.value && typeof model.value === 'number') model.value -= 1;
};
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <label v-if="label" class="text-xs font-medium" :for="name?.replaceAll(' ', '-')">{{ label }}</label>
    <div
      class="w-full box-content justify-between flex gap-1.5 items-center rounded-lg"
      :class="{ 'border-red-600': error, 'border-gray-200': !error, 'border px-4 h-12': variant === 'default' }"
    >
      <button
        type="button"
        :disabled="Number(model) < 2"
        @click="decrease"
        class="font-light flex disabled:text-gray-400 items-center justify-center font-Montserrat"
        :class="{
          'rounded-full bg-gray-150 size-6 text-xl': variant === 'rounded',
          'size-7 text-3xl': variant === 'default',
        }"
      >
        -
      </button>

      <input
        class="text-center block text-sm font-semibold"
        :class="{ 'w-14': variant === 'default', 'w-6': variant === 'rounded' }"
        type="text"
        v-model="model"
        autocomplete="off"
        @blur="
          () => {
            if (!model || model === 0) model = 1;
          }
        "
      />

      <button
        type="button"
        @click="increment"
        class="font-light flex items-center justify-center font-Montserrat"
        :class="{
          'rounded-full bg-gray-150 size-6 text-xl': variant === 'rounded',
          'size-7 text-3xl': variant === 'default',
        }"
      >
        +
      </button>
    </div>

    <span v-if="error" class="text-red-400 text-xs font-semibold">{{ error }}</span>
  </div>
</template>
