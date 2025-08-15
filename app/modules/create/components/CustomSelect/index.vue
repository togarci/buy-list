<script setup lang="ts">
export interface options {
  label: string;
  value: number | string;
}

defineProps<{
  label?: string;
  name?: string;
  placeholder: string;
  error: string | undefined;
  options: options[];
  disabled?: boolean;
}>();

const isOpenSelect = ref(false);
const selectRef: any = ref(null);
const model = defineModel();

onMounted(() => {
  window.addEventListener('click', (evt) => {
    if (selectRef.value && !selectRef.value?.contains(evt.target)) isOpenSelect.value = false;
  });
});
</script>

<template>
  <div ref="selectRef" class="flex flex-col w-full gap-2">
    <label class="text-xs font-medium" :for="name?.replaceAll(' ', '-')">{{ label }}</label>
    <div
      class="w-full relative flex items-center rounded-lg h-12 py-2 px-4 border"
      :class="{ 'border-red-600': error, 'border-gray-200': !error, 'bg-gray-300': disabled }"
      @click="
        () => {
          if (!disabled) {
            isOpenSelect = !isOpenSelect;
          }
        }
      "
    >
      <span v-if="!model" class="text-sm font-Montserrat line-clamp-1 text-gray-600/70 font-normal">{{
        placeholder
      }}</span>

      <span class="capitalize" v-else>{{ options.find((option) => option.value === model)?.label }}</span>

      <Icon
        name="material-symbols:arrow-forward-ios-rounded"
        class="text-gray-700 ease-linear duration-200 transition-transform absolute top-3.5 right-4"
        :class="{ 'rotate-90': !isOpenSelect, '-rotate-90': isOpenSelect }"
      />

      <div v-if="isOpenSelect" class="bg-white border w-full absolute top-12 z-10 left-0 border-gray-200 rounded-xl">
        <button
          type="button"
          v-for="(option, index) in options"
          :key="`${option.label}-${index}`"
          class="w-full capitalize px-4 text-start hover:bg-gray-100 py-3"
          @click="model = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <span class="text-red-400 text-xs font-semibold">{{ error }}</span>
  </div>
</template>
