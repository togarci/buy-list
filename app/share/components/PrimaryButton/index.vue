<script lang="ts" setup>
defineProps<{
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
    <div class="text-white mx-auto text-sm font-bold"><slot /></div>
  </button>
</template>
