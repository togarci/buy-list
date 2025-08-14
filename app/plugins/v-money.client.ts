import { defineNuxtPlugin } from '#app';
import money from 'v-money3';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(money);
});
