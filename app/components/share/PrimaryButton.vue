<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>

<template>
  <div
    class="w-full cursor-pointer items-center flex gap-3 p-3.5 bg-primary rounded-xl"
  >
    <slot name="node-icon" />

    <p class="text-primary text-sm font-bold">{{ label }}</p>
  </div>
</template>
