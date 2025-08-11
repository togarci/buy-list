<script setup lang="ts">
defineProps<{
  label?: string;
  name?: string;
  placeholder: string;
  error: string | undefined;
}>();

const model = defineModel();
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <label class="text-xs font-medium" :for="name?.replaceAll(' ', '-')">{{
      label
    }}</label>
    <div
      class="w-full rounded-lg h-12 py-2 px-4 border"
      :class="{ 'border-red-600': error, 'border-gray-200': !error }"
    >
      <input
        :id="name?.replaceAll(' ', '-')"
        type="text"
        :name="name"
        v-model="model"
        :placeholder="placeholder"
        class="size-full font-Montserrat text-black placeholder:text-600 font-normal text-sm"
      />
    </div>

    <span class="text-red-400 text-xs font-semibold">{{ error }}</span>
  </div>
</template>
