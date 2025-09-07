<script setup lang="ts">
import Alert from '~/share/components/Alert/index.vue';
import HeaderBackRoute from '~/share/components/HeaderBaskRoute/index.vue';

import Form from '~/modules/list/components/Form/index.vue';
import PrimaryButton from '~/share/components/PrimaryButton/index.vue';
import SecondaryButton from '~/share/components/SecondaryButton/index.vue';
import ListButton from '~/share/components/ListButton/index.vue';

import { toast } from 'vue3-toastify';
import { useBuyListStore } from '~/modules/list/stores/buy-list';
import { useDataListStore } from '~/share/stores/dataList';

const router = useRouter();
const route = useRoute();
const listId: any = route.params.listId;

const buyListStore = useBuyListStore();
const { addToData, dataList, updateData } = useDataListStore();

const listName = ref<string | null>(null);
const isOpenForm = ref<boolean>(false);
const isOpenAlert = ref<boolean>(false);

const formRef = ref<InstanceType<typeof Form> | null>(null);

definePageMeta({
  title: 'Buy List - Create',
});

const addItem = (body: any) => {
  try {
    buyListStore.addToList(body);
    isOpenForm.value = false;
    formRef.value?.handleResetForm();
    toast.success('Produto adicionado com sucesso!');
  } catch (error) {
    toast.error('Ops! Ocorreu um erro ao adicionar o produto.');
  }
};

const saveList = () => {
  let body: any = {
    name: listName.value ?? '',
    data: buyListStore.listItems,
  };

  listId === 'new' ? addToData(body) : updateData(listId, body);
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

onMounted(() => {
  if (listId !== 'new') {
    let selectedList = dataList.find((list) => list.id === listId);
    selectedList = JSON.parse(JSON.stringify(selectedList));

    if (selectedList) {
      buyListStore.setListItems(selectedList.data);
      listName.value = selectedList.name ?? null;
    }
  }
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

    <div class="flex max-lg:flex-1 lg:h-min max-lg:justify-center gap-5">
      <div
        class="lg:w-80 gap-5 lg:flex w-full flex-col"
        :class="{ hidden: isOpenForm, 'flex max-lg:justify-between min-h-full': !isOpenForm }"
      >
        <ListButton :listItems="buyListStore.listItems" showItems v-model="listName" />

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

      <div class="mt-7 mr-2 max-lg:hidden">
        <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-gray-600 text-base" />
      </div>

      <Form ref="formRef" @submit="addItem" :isOpenForm="isOpenForm" />
    </div>
  </main>
</template>
