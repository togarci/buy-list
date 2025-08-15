<script setup lang="ts">
defineProps<{
  label?: string;
  name?: string;
  placeholder?: string;
  error: string | undefined;
  variant?: 'price';
  autocomplete?: HTMLInputElement['autocomplete'];
}>();

const model = defineModel();
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
        :class="{
          'text-gray-600/70': model === 0,
          'text-black': typeof model === 'number' && model > 0.0,
        }"
        v-if="variant === 'price'"
        >R$</span
      >
      <input
        v-money3="{
          thousands: '.',
          decimal: ',',
          precision: 2,
        }"
        :id="name?.replaceAll(' ', '-')"
        type="text"
        :name="name"
        v-model="model"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="size-full font-Montserrat text-black placeholder:text-600 font-normal text-sm"
        v-if="variant === 'price'"
      />

      <input
        :id="name?.replaceAll(' ', '-')"
        type="text"
        :name="name"
        v-model="model"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="size-full font-Montserrat text-black placeholder:text-600 font-normal text-sm"
        v-else
      />
    </div>

    <span class="text-red-400 text-xs font-semibold">{{ error }}</span>
  </div>
</template>
