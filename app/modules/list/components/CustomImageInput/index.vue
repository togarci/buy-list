<script lang="ts" setup>
import { toast } from 'vue3-toastify';

const emits = defineEmits(['input']);

const props = defineProps<{
  limitMbSize: number;
  value: string;
}>();

const refInput = ref<HTMLInputElement | null>(null);

const handleClick = () => {
  if (refInput.value) {
    refInput.value.value = '';
  }

  refInput.value?.click();
};

const handleChange = (evt: Event) => {
  const inputValue = evt.target as HTMLInputElement;
  const file = inputValue.files?.[0];

  if (file?.size && file?.size > props.limitMbSize * 1024 * 1024) {
    toast.error('Tamanho excedido! A imagem deve ter no máximo 1 MB.', {
      position: toast.POSITION.TOP_CENTER,
    });

    return;
  }

  emits('input', file ? URL.createObjectURL(file) : '');
};

const handleRemoveImage = () => {
  emits('input', '');
};
</script>

<template>
  <div class="relative">
    <button
      v-if="value"
      class="absolute top-2 right-2 size-5 border border-gray-600 rounded-full bg-white flex justify-center items-center"
      @click="handleRemoveImage"
    >
      <Icon name="material-symbols:close-rounded" />
    </button>
    <div
      @click="handleClick"
      class="flex rounded-md cursor-pointer justify-center items-center w-full overflow-hidden border border-dashed border-gray-400 max-lg:flex-col"
      :class="{ 'py-5 px-10 gap-3': !value }"
    >
      <input
        ref="refInput"
        type="file"
        class="h-0 hidden"
        @change="handleChange"
        accept="image/png, image/gif, image/jpeg, image/jpg"
      />

      <template v-if="!value">
        <Icon name="material-symbols:backup-outline-rounded" class="text-5xl lg:text-6xl text-gray-400/80" />

        <div class="flex flex-col gap-3">
          <p class="text-black text-center font-Montserrat font-bold text-sm lg:text-base">
            Clique aqui para fazer o upload do arquivo
          </p>

          <span class="text-gray-600 text-[10px] lg:text-xs font-normal">
            PNG, GIF ou JPEG. Tamanho máximo de arquivo 1 Mb</span
          >
        </div>
      </template>

      <template v-else>
        <img class="size-full object-contain" :src="value" alt="non alt" />
      </template>
    </div>
  </div>
</template>
