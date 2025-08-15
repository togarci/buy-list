<script lang="ts" setup>
defineProps<{
  label: string;
  type?: HTMLButtonElement['type'];
}>();

const emits = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button
    @click="emits('click')"
    :type="type ?? 'button'"
    class="w-full min-h-12 cursor-pointer items-center flex gap-3 p-3.5 bg-primary rounded-xl"
  >
    <slot name="node-icon" />

    <p class="text-white mx-auto text-sm font-bold">{{ label }}</p>
  </button>
</template>
