<script setup lang="ts">
defineProps<{
  label?: string;
  name?: string;
  placeholder?: string;
  error: string | undefined;
  variant?: 'price';
  autocomplete?: HTMLInputElement['autocomplete'];
}>();

const model = defineModel<any>();

const formatPrice = (value: string | number) => {
  const num = typeof value === 'number' ? value : Number(String(value).replace(/\D/g, '')) / 100;
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const parsePrice = (value: string) => {
  const numeric = value.replace(/\D/g, '');
  return numeric ? (Number(numeric) / 100).toFixed(2) : '';
};

const handlePriceInput = (evt: Event) => {
  const input = evt.target as HTMLInputElement;
  const parsed = parsePrice(input.value);
  model.value = parsed;
  input.value = formatPrice(parsed);
};

const handleFocus = (event: any) => {
  const input = event.target as HTMLInputElement;
  setTimeout(() => {
    input.selectionStart = input.selectionEnd = input.value.length;
  }, 0);
};
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <label class="text-xs font-medium" :for="name?.replaceAll(' ', '-')">{{ label }}</label>
    <div
      class="w-full flex gap-1.5 items-center rounded-lg h-12 py-2 px-4 border"
      :class="{ 'border-red-600': error, 'border-gray-200': !error }"
    >
      <span
        class="text-sm font-normal font-Montserrat"
        :class="{
          'text-gray-600/70': model === 0,
          'text-black': Number(model) > 0.0,
        }"
        v-if="variant === 'price'"
        >R$
      </span>
      <input
        :id="name?.replaceAll(' ', '-')"
        type="text"
        :name="name"
        :value="formatPrice(model)"
        data-testId="custom-price-input"
        @input="handlePriceInput"
        @focus="handleFocus"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="size-full font-Montserrat text-black placeholder:text-600 font-normal text-sm"
        v-if="variant === 'price'"
      />

      <input
        :id="name?.replaceAll(' ', '-')"
        type="text"
        :name="name"
        v-model="model"
        data-testId="custom-text-input"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="size-full font-Montserrat text-black placeholder:text-600 font-normal text-sm"
        v-else
      />
    </div>

    <span class="text-red-400 text-xs font-semibold">{{ error }}</span>
  </div>
</template>
