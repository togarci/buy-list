<script lang="ts" setup>
import { toast } from 'vue3-toastify';

const props = defineProps<{
  limitMbSize: number;
}>();

let model = defineModel<File | null>();
const refInput = ref<HTMLInputElement | null>(null);
const urlImage = ref<string | undefined>();

const handleClick = () => {
  refInput.value?.click();
};

const handleChange = (evt: Event) => {
  const inputValue = evt.target as HTMLInputElement;
  const file = inputValue.files?.[0];

  if (file?.size && file?.size > props.limitMbSize * 1024 * 1024) {
    toast.error('Tamanho excedido! A imagem deve ter no máximo 1 MB.', {
      position: toast.POSITION.TOP_LEFT,
    });

    return;
  }

  model.value = file ?? null;
  urlImage.value = model.value ? URL.createObjectURL(model.value) : '';
};
</script>

<template>
  <div
    @click="handleClick"
    class="flex rounded-xl justify-center items-center w-ful overflow-hidden border border-dashed border-gray-400 flex-col"
    :class="{ 'py-5 px-10 gap-3': !urlImage }"
  >
    <input
      ref="refInput"
      type="file"
      class="h-0 invisible"
      @change="handleChange"
      accept="image/png, image/gif, image/jpeg, image/jpg"
    />

    <template v-if="!urlImage">
      <Icon
        name="material-symbols:backup-outline-rounded"
        class="text-5xl text-gray-600"
      />

      <p class="text-black text-center font-Montserrat font-bold text-sm">
        Clique aqui para fazer o upload do arquivo
      </p>

      <span class="text-gray-600 text-[10px] font-normal">
        PNG, GIF ou JPEG. Tamanho máximo de arquivo 1 Mb</span
      >
    </template>

    <template v-else>
      <img class="size-full object-contain" :src="urlImage" alt="non alt" />
    </template>
  </div>
</template>
