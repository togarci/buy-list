<script lang="ts" setup>
import ListButton from '~/share/components/ListButton/index.vue';
import SecondaryButton from '~/share/components/SecondaryButton/index.vue';
import { useDataListStore } from '~/share/stores/data-list';

const dataListStore = useDataListStore();

const handleEdit = () => {};

const handleView = () => {};
</script>

<template>
  <main class="flex min-h-screen min-w-screen flex-col justify-center gap-10 items-center">
    <img src="@/assets/imgs/full_logo.png" alt="logo" />

    <div class="max-w-80 w-full flex flex-col gap-4">
      <ListButton
        showActions
        v-for="buyList in dataListStore.dataList"
        :listItems="buyList.data"
        :listName="buyList.name"
        @delete="() => dataListStore.removeFromData(buyList.id ?? '')"
      />

      <NuxtLink to="/create">
        <SecondaryButton label="Criar uma lista de compras">
          <div class="flex gap-2 items-center">
            <div class="size-12 bg-primary-100 flex justify-center items-center rounded-xl">
              <Icon name="mdi:plus" class="text-2xl text-primary" />
            </div>
            <p class="text-primary text-sm font-bold">Criar uma lista de compras</p>
          </div>
        </SecondaryButton>
      </NuxtLink>
    </div>
  </main>
</template>
