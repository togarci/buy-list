<script setup lang="ts">
import HeaderBackRoute from '~/components/share/HeaderBaskRoute.vue/index.vue';
import CustomImageInput from '~/components/create/components/CustomImageInput/index.vue';
import productFormSchema from '~/components/create/schemas/productFormSchema';
import { useField, useForm } from 'vee-validate';

const { handleSubmit } = useForm({
  validationSchema: productFormSchema,
  initialValues: {
    quantity: 1,
  },
});

const { value: category, errorMessage: categoryFormError } =
  useField('category');
const { value: subCategory, errorMessage: subCategoryFormError } =
  useField('subCategory');
const { value: productName, errorMessage: productNameFormError } =
  useField('productName');
const { value: type, errorMessage: typeFormError } = useField('type');

const { value: price, errorMessage: priceFormError } = useField('price');

const { value: quantity, errorMessage: quantityFormError } =
  useField('quantity');

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

const categorias = [
  { label: 'Alimentos', value: 1 },
  { label: 'Frescos e Hortifruti', value: 2 },
  { label: 'Padaria & Confeitaria', value: 3 },
  { label: 'Açougue', value: 4 },
  { label: 'Peixaria', value: 5 },
  { label: 'Frios e Laticínios', value: 6 },
  { label: 'Congelados', value: 7 },
  { label: 'Mercearia seca', value: 8 },
  { label: 'Doces, guloseimas e snacks', value: 9 },
  { label: 'Bebidas', value: 10 },
  { label: 'Bebês e Infantis', value: 11 },
  { label: 'Limpeza e Utilidades Domésticas', value: 12 },
  { label: 'Higiene e Beleza', value: 13 },
  { label: 'Pets', value: 14 },
  { label: 'Produtos Naturais e Dietéticos', value: 15 },
  { label: 'Sazonais e Festas', value: 16 },
  { label: 'Papelaria e Diversos', value: 17 },
];
</script>

<template>
  <main class="flex flex-col gap-10 p-5">
    <HeaderBackRoute label="Criando Lista" />

    <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
      <ShareCustomSelect
        v-model="category"
        label="Selecione a categoria do produto"
        name="productCategory"
        :error="categoryFormError"
        placeholder="Selecione uma categoria."
        :options="categorias"
      />

      <ShareCustomSelect
        v-model="subCategory"
        label="Selecione uma subcategoria do produto"
        name="productSubCategory"
        :error="subCategoryFormError"
        placeholder="Selecione uma subcategoria."
        :options="categorias"
      />

      <ShareCustomInput
        v-model="productName"
        label="Nome do produto"
        name="productName"
        placeholder="e.g Milho verde em conserva"
        :error="productNameFormError"
      />

      <ShareCustomSelect
        v-model="type"
        label="Tipo"
        name="productTipo"
        :error="typeFormError"
        placeholder="Selecione um tipo"
        :options="categorias"
      />

      <div class="flex gap-4 w-full">
        <ShareCustomQuantity
          name="quantity"
          label="Quantidade"
          v-model="quantity"
          :error="quantityFormError"
        />

        <ShareCustomInput
          label="Preço"
          name="price"
          v-model="price"
          :error="priceFormError"
          variant="price"
          autocomplete="off"
        />
      </div>

      <CustomImageInput :limitMbSize="1" />

      <SharePrimaryButton type="submit" label="Adicionar item" />
    </form>
  </main>
</template>
