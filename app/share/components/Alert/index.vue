<script lang="ts" setup>
import PrimaryButton from '~/share/components/PrimaryButton/index.vue';

const emit = defineEmits<{
  (e: 'handleSubmit'): void;
}>();

defineProps<{
  title?: string;
  description?: string;
  ctaLabel?: string;
}>();

const isOpenAlert = defineModel<boolean>();
const modalRef = ref<HTMLDivElement | null>(null);

const handleClick = (evt: MouseEvent) => {
  if (modalRef.value && !modalRef.value.contains(evt.target as Node)) {
    isOpenAlert.value = false;
  }
};
</script>

<template>
  <div
    v-if="isOpenAlert"
    @click="handleClick"
    class="fixed top-0 right-0 z-40 w-screen h-screen flex items-center justify-center backdrop-blur-sm"
  >
    <div
      ref="modalRef"
      role="dialog"
      aria-modal="true"
      class="flex flex-col min-w-80 bg-white rounded-lg gap-3.5 p-5 border-gray-100 border items-center"
    >
      <h1 class="font-bold text-xl font-Montserrat">Atenção!</h1>
      <p v-if="title" class="font-bold text-base font-Montserrat">{{ title }}</p>

      <span v-if="description" class="font-Montserrat text-sm font-normal my-1.5">{{ description }}</span>

      <PrimaryButton v-if="ctaLabel" @click="emit('handleSubmit')">
        {{ ctaLabel }}
      </PrimaryButton>
    </div>
  </div>
</template>
