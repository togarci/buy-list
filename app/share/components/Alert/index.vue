<script lang="ts" setup>
import PrimaryButton from '~/share/components/PrimaryButton/index.vue';

const emits = defineEmits(['handleSubmit']);

defineProps<{
  title?: string;
  description?: string;
  ctaLabel?: string;
}>();

const isOpenAlert = defineModel();
const modalRef: any = ref(null);

onMounted(() => {
  window.addEventListener('click', (evt) => {
    if (modalRef.value && !modalRef.value?.contains(evt.target)) isOpenAlert.value = false;
  });
});
</script>

<template>
  <div
    v-if="isOpenAlert"
    class="fixed top-0 right-0 z-40 w-screen h-screen flex items-center justify-center backdrop-blur-sm"
  >
    <div
      ref="modalRef"
      class="flex flex-col min-w-80 bg-white rounded-lg gap-3.5 p-5 border-gray-100 border items-center"
    >
      <h1 class="font-bold text-xl font-Montserrat">Atenção!</h1>
      <p v-if="title" class="font-bold text-base font-Montserrat">{{ title }}</p>

      <span v-if="description" class="font-Montserrat text-sm font-norma my-1.5">{{ description }}</span>

      <PrimaryButton @click="emits('handleSubmit')" v-if="ctaLabel">
        {{ ctaLabel }}
      </PrimaryButton>
    </div>
  </div>
</template>
