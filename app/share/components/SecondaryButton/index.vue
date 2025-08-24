<script lang="ts" setup>
defineProps<{
  type?: HTMLButtonElement['type'];
}>();

const emits = defineEmits(['click']);
</script>

<template>
  <button
    @click="emits('click')"
    :type="type"
    class="w-full bg-gray-010 cursor-pointer border border-primary p-3.5 rounded-xl"
  >
    <div class="text-primary text-sm font-bold"><slot /></div>
  </button>
</template>
