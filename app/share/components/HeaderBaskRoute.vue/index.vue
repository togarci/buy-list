<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="flex gap-4 items-center text-black">
    <div>
      <Icon name="material-symbols:arrow-left-alt-rounded" class="text-2xl" />
    </div>
    <p class="font-bold font-Montserrat text-xl">{{ label }}</p>
  </div>
</template>
