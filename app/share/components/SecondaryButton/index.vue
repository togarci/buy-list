<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>

<template>
  <div
    class="w-full bg-gray-010 cursor-pointer items-center flex gap-3 border border-primary p-3.5 rounded-xl"
  >
    <slot name="node-icon" />

    <p class="text-primary text-sm font-bold">{{ label }}</p>
  </div>
</template>
