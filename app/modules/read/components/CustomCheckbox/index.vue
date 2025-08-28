<script lang="ts" setup>
const model = defineModel();
</script>

<template>
  <div
    @click="model = !model"
    class="size-6 border cursor-pointer bg-gray-100 rounded-sm flex items-center justify-center"
  >
    <Icon v-if="model" name="material-symbols:check" class="text-[#0B0B1E] text-base" />
  </div>
</template>
