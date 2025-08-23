<script setup lang="ts">
import axios from 'axios';

import HeaderBackRoute from '~/share/components/HeaderBaskRoute.vue/index.vue';
import CustomImageInput from '~/modules/create/components/CustomImageInput/index.vue';
import productFormSchema from '~/modules/create/schemas/productFormSchema';
import CustomSelect, { type options } from '~/modules/create/components/CustomSelect/index.vue';
import CustomInput from '~/modules/create/components/CustomInput/index.vue';
import CustomQuantity from '~/modules/create/components/CustomQuantity/index.vue';
import PrimaryButton from '~/share/components/PrimaryButton/index.vue';
import SecondaryButton from '~/share/components/SecondaryButton/index.vue';
import ListButton from '~/share/components/ListButton/index.vue';

import { useField, useForm } from 'vee-validate';
import { toast } from 'vue3-toastify';
import type { RequestCategoryType } from '~/modules/create/types/request-categorys';
import type { RequestProductType } from '~/modules/create/types/request-product-types';
import { useBuyListStore } from '~/share/stores/buy-list';
import calculateTotalPrice from '~/utils/calculateTotalPrice';

const { addToList, listItems } = useBuyListStore();

const listDataCategory = ref<RequestCategoryType[]>([]);
const productTypes = ref<RequestProductType[]>([]);

const optionsCategorys = ref<options[]>([]);
const optionsSubCategorys = ref<options[]>([]);
const optionsProductTypes = ref<options[]>([]);

const imageRef = ref<string>('');

const { handleSubmit, resetForm } = useForm<{
  category: string;
  subCategory: string;
  productName: string;
  type: string;
  price: number;
  quantity: number;
}>({
  validationSchema: productFormSchema,
  initialValues: {
    category: '',
    subCategory: '',
    productName: '',
    type: 'un',
    price: 0,
    quantity: 1,
  },
});

const { value: category, errorMessage: categoryFormError } = useField('category');
const { value: subCategory, errorMessage: subCategoryFormError } = useField('subCategory');
const { value: productName, errorMessage: productNameFormError } = useField('productName');
const { value: type, errorMessage: typeFormError } = useField('type');
const { value: price, errorMessage: priceFormError } = useField('price');
const { value: quantity, errorMessage: quantityFormError } = useField('quantity');

const onSubmit = handleSubmit((values) => {
  try {
    const totalPrice = calculateTotalPrice(values.price, values.quantity);
    const findProductType = productTypes.value.find((type) => type.sigla === values.type);

    const body = {
      id: listItems.length,
      price: values.price,
      totalPrice: totalPrice,
      quantity: values.quantity,
      product: {
        image: imageRef.value,
        name: values.productName,
        category: values.category,
        subCategory: values.subCategory,
        type: findProductType?.tipo ?? '',
        shortType: findProductType?.sigla ?? '',
      },
    };

    addToList(body);
    resetForm();
    imageRef.value = '';

    toast.success('Produto adicionado com sucesso!');
  } catch (error) {
    toast.error('Ops! Ocorreu um erro ao adicionar o produto.');
  }
});

const getCategorys = async () => {
  try {
    const { data } = await axios.get<RequestCategoryType[]>('/api/category');
    optionsCategorys.value = data?.map((item, index) => {
      return {
        label: item.category,
        value: item.category,
      };
    });

    listDataCategory.value = data;
  } catch (error) {
    toast.error('Ops! Ocorreu um erro no carregamentos algumas categorias');
  }
};

const getProductTypes = async () => {
  try {
    const { data } = await axios.get<RequestProductType[]>('/api/product-types');

    const options = data.map((item) => {
      return {
        label: `${item.tipo} / ${item.sigla}`,
        value: item.sigla,
      };
    });

    productTypes.value = data ?? [];
    optionsProductTypes.value = options ?? [];
  } catch (error) {
    toast.error('Ops! Ocorreu um erro no carregamentos algumas categorias');
  }
};

const handleImageInput = (file: string) => {
  imageRef.value = file;
};

watch(category, () => {
  if (category.value) {
    const selectedCategory = listDataCategory.value.find((cat) => cat.category === category.value);
    const listSubCategory = selectedCategory?.subCategorys?.map((item) => {
      return {
        label: item,
        value: item,
      };
    });

    optionsSubCategorys.value = listSubCategory ?? [];
    subCategory.value = undefined;
  }
});

onMounted(() => {
  getCategorys();
  getProductTypes();
});
</script>

<template>
  <main class="flex flex-col gap-10 p-5 xl:p-20">
    <HeaderBackRoute id="create_page_back_route" label="Criando Lista" />

    <div class="flex w-full max-lg:justify-center gap-10">
      <div class="w-80 hidden gap-5 lg:flex flex-col">
        <ListButton editionMode />

        <SecondaryButton v-if="listItems.length > 0" type="button"> Concluir lista </SecondaryButton>
      </div>

      <form
        class="flex max-w-[680px] w-full flex-col gap-5 lg:p-6 rounded-2xl lg:border lg:border-gray-200"
        @submit.prevent="onSubmit"
      >
        <CustomSelect
          v-model="category"
          label="Selecione a categoria do produto"
          name="productCategory"
          :error="categoryFormError"
          placeholder="Selecione uma categoria."
          :options="optionsCategorys"
        />

        <CustomSelect
          v-model="subCategory"
          label="Selecione uma subcategoria do produto"
          name="productSubCategory"
          :error="subCategoryFormError"
          placeholder="Selecione uma subcategoria."
          :options="optionsSubCategorys"
          :disabled="optionsSubCategorys.length === 0"
        />

        <CustomInput
          v-model="productName"
          label="Nome do produto"
          name="productName"
          placeholder="e.g Milho verde em conserva"
          :error="productNameFormError"
        />

        <div class="lg:hidden">
          <CustomSelect
            v-model="type"
            label="Tipo"
            name="productTipo"
            :error="typeFormError"
            placeholder="Selecione um tipo"
            :options="optionsProductTypes"
          />
        </div>

        <div class="flex gap-4 w-full">
          <div class="max-lg:hidden flex-1">
            <CustomSelect
              v-model="type"
              label="Tipo"
              name="productTipo"
              :error="typeFormError"
              placeholder="Selecione um tipo"
              :options="optionsProductTypes"
            />
          </div>

          <div class="w-full lg:w-32">
            <CustomQuantity name="quantity" label="Quantidade" v-model="quantity" :error="quantityFormError" />
          </div>

          <div class="w-full lg:w-48">
            <CustomInput
              label="Preço"
              name="price"
              v-model="price"
              :error="priceFormError"
              variant="price"
              autocomplete="off"
            />
          </div>
        </div>

        <CustomImageInput :value="imageRef" @input="handleImageInput" :limitMbSize="1" />

        <div class="max-w-80">
          <PrimaryButton type="submit" label="Adicionar item" />
        </div>
      </form>
    </div>
  </main>
</template>
