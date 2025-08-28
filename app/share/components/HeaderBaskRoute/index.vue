<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
}>();

const emits = defineEmits(['click']);
</script>

<template>
  <button :id="id" type="button" @click="emits('click')" class="flex cursor-pointer gap-4 items-center text-black">
    <div>
      <Icon name="material-symbols:arrow-left-alt-rounded" class="text-2xl" />
    </div>
    <label :for="id" class="font-bold font-Montserrat line-clamp-1 text-xl">{{ label }}</label>
  </button>
</template>
