<script lang="ts" setup>
defineProps<{
  variant?: 'rounded';
  name: string;
  label: string;
  error: string | undefined;
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
    <label class="text-xs font-medium" :for="name?.replaceAll(' ', '-')">{{ label }}</label>
    <div
      class="w-full box-content justify-between flex gap-1.5 items-center rounded-lg h-12 px-4 border"
      :class="{ 'border-red-600': error, 'border-gray-200': !error }"
    >
      <button
        type="button"
        @click="decrease"
        class="font-light size-7 flex items-center justify-center font-Montserrat text-3xl"
        :class="{ 'rounded-full bg-gray-150': variant === 'rounded' }"
      >
        -
      </button>

      <input
        class="text-center block w-14 text-sm font-semibold"
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
        class="font-light size-7 flex items-center justify-center font-Montserrat text-3xl"
        :class="{ 'rounded-full bg-gray-150': variant === 'rounded' }"
      >
        +
      </button>
    </div>

    <span class="text-red-400 text-xs font-semibold">{{ error }}</span>
  </div>
</template>
