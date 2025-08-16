<script lang="ts" setup>
import ListButton from '~/share/components/ListButton/index.vue';
import SecondaryButton from '~/share/components/SecondaryButton/index.vue';
</script>

<template>
  <main class="flex min-h-screen min-w-screen flex-col justify-center gap-10 items-center">
    <img src="@/assets/imgs/full_logo.png" alt="logo" />

    <div class="w-72 flex flex-col gap-4">
      <NuxtLink to="/read/56431">
        <ListButton />
      </NuxtLink>

      <NuxtLink to="/create">
        <SecondaryButton label="Criar uma lista de compras">
          <template v-slot:node-icon>
            <div class="size-12 bg-primary-100 flex justify-center items-center rounded-xl">
              <Icon name="mdi:plus" class="text-2xl text-primary" />
            </div>
          </template>
        </SecondaryButton>
      </NuxtLink>
    </div>
  </main>
</template>
