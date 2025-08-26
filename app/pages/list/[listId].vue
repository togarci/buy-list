<script setup lang="ts">
import axios from 'axios';
import Alert from '~/share/components/Alert/index.vue';
import HeaderBackRoute from '~/share/components/HeaderBaskRoute.vue/index.vue';
import CustomImageInput from '~/modules/list/components/CustomImageInput/index.vue';
import productFormSchema from '~/modules/list/schemas/productFormSchema';
import CustomSelect, { type options } from '~/modules/list/components/CustomSelect/index.vue';
import CustomInput from '~/modules/list/components/CustomInput/index.vue';
import CustomQuantity from '~/modules/list/components/CustomQuantity/index.vue';
import PrimaryButton from '~/share/components/PrimaryButton/index.vue';
import SecondaryButton from '~/share/components/SecondaryButton/index.vue';
import ListButton from '~/share/components/ListButton/index.vue';

import { useField, useForm } from 'vee-validate';
import { toast } from 'vue3-toastify';
import type { RequestCategoryType } from '~/modules/list/types/request-categorys';
import type { RequestProductType } from '~/modules/list/types/request-product-types';
import { useBuyListStore } from '~/modules/list/stores/buy-list';
import calculateTotalPrice from '~/utils/calculateTotalPrice';
import { useDataListStore } from '~/share/stores/data-list';

const router = useRouter();
const route = useRoute();
const listId = route.params.listId;

const buyListStore = useBuyListStore();
const { addToData, dataList } = useDataListStore();

const listDataCategory = ref<RequestCategoryType[]>([]);
const productTypes = ref<RequestProductType[]>([]);

const listName = ref<string | null>(null);
const imageRef = ref<string>('');
const isOpenForm = ref<boolean>(false);
const isOpenAlert = ref<boolean>(false);

const optionsCategorys = ref<options[]>([]);
const optionsSubCategorys = ref<options[]>([]);
const optionsProductTypes = ref<options[]>([]);

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

const addItem = handleSubmit((values) => {
  try {
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

    buyListStore.addToList(body);
    resetForm();
    imageRef.value = '';
    isOpenForm.value = false;

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

const saveList = () => {
  const body = {
    name: listName.value ?? '',
    data: buyListStore.listItems,
  };

  addToData(body);
  buyListStore.clearList();
  toast.success('Lista salva com sucesso !');
  router.push('/');
};

const handleBack = () => {
  isOpenForm.value ? (isOpenForm.value = false) : router.back();
};

const handleAlertAction = () => {
  isOpenAlert.value = false;
  buyListStore.clearList();
  router.push('/');
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
  if (listId !== 'new') {
    const selectedList = dataList.find((list) => list.id === listId);
    if (selectedList) {
      buyListStore.setListItems(selectedList.data);
      listName.value = selectedList.name ?? null;
    }
  }

  getCategorys();
  getProductTypes();
});

onBeforeRouteLeave(() => {
  if (buyListStore.listItems.length > 0) {
    isOpenAlert.value = true;
    return false;
  }

  return true;
});
</script>

<template>
  <main class="flex min-h-screen flex-col gap-10 p-5 xl:p-20">
    <Alert
      v-model="isOpenAlert"
      ctaLabel="Sair"
      description="Deseja realmente sair?"
      title="Você tem uma lista não salva!"
      @handleSubmit="handleAlertAction"
    />

    <HeaderBackRoute @click="handleBack" id="create_page_back_route" :label="isOpenForm ? 'Voltar' : 'Criando Lista'" />

    <div class="flex max-lg:flex-1 lg:h-min max-lg:justify-center gap-10">
      <div
        class="lg:w-80 gap-5 lg:flex w-full flex-col"
        :class="{ hidden: isOpenForm, 'flex max-lg:justify-between min-h-full': !isOpenForm }"
      >
        <ListButton :listItems="buyListStore.listItems" editionMode v-model="listName" />

        <div class="flex flex-col w-full gap-2.5">
          <div class="lg:hidden">
            <SecondaryButton @click="isOpenForm = true" type="button"> Adicionar novo item </SecondaryButton>
          </div>
          <div class="lg:hidden">
            <PrimaryButton @click="saveList"> Concluir </PrimaryButton>
          </div>

          <div class="w-full max-lg:hidden" :class="{ 'lg:hidden': buyListStore.listItems.length === 0 }">
            <SecondaryButton @click="saveList" type="button"> Concluir </SecondaryButton>
          </div>
        </div>
      </div>

      <form
        class="flex max-w-[680px] w-full flex-col gap-5 lg:p-6 rounded-2xl lg:border lg:border-gray-200"
        :class="{ 'max-lg:hidden': !isOpenForm }"
        @submit.prevent="addItem"
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
    </div>
  </main>
</template>
