<script lang="ts" setup>
import axios from 'axios';

import { toast } from 'vue3-toastify';
import { useField, useForm } from 'vee-validate';
import { useBuyListStore } from '~/modules/list/stores/buy-list';

import type { RequestCategoryType } from '~/modules/list/types/request-categorys';
import type { RequestProductType } from '~/modules/list/types/request-product-types';

import CustomSelect, { type options } from '~/modules/list/components/CustomSelect/index.vue';
import CustomInput from '~/modules/list/components/CustomInput/index.vue';
import CustomQuantity from '~/modules/list/components/CustomQuantity/index.vue';
import CustomImageInput from '~/modules/list/components/CustomImageInput/index.vue';
import PrimaryButton from '~/share/components/PrimaryButton/index.vue';
import calculateTotalPrice from '~/utils/calculateTotalPrice';
import productFormSchema from './schema';

const emit = defineEmits(['submit']);
const buyListStore = useBuyListStore();

const listDataCategory = ref<RequestCategoryType[]>([]);
const productTypes = ref<RequestProductType[]>([]);
const imageRef = ref<string>('');

const optionsCategorys = ref<options[]>([]);
const optionsSubCategorys = ref<options[]>([]);
const optionsProductTypes = ref<options[]>([]);

defineProps<{
  isOpenForm: boolean;
}>();

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

const handleResetForm = () => {
  resetForm();
  imageRef.value = '';
};

const submit = handleSubmit((values) => {
  const totalPrice = calculateTotalPrice(values.price, values.quantity);
  const findProductType = productTypes.value.find((type) => type.sigla === values.type);

  const body = {
    id: buyListStore.listItems.length,
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

  emit('submit', body);
});

defineExpose({
  handleResetForm,
});

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
  <form
    class="flex max-w-[680px] w-full flex-col gap-5 lg:p-6 rounded-2xl lg:border lg:border-gray-200"
    :class="{ 'max-lg:hidden': !isOpenForm }"
    @submit.prevent="submit"
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

    <div class="sm:max-w-80">
      <PrimaryButton type="submit"> Adicionar item </PrimaryButton>
    </div>
  </form>
</template>
