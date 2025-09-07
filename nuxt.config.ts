import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt', '@nuxt/icon', '@nuxt/eslint', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],

  components: [
    {
      path: '~/modules',
      pathPrefix: false,
      pattern: '**/components',
    },
    {
      path: '~/share',
      pathPrefix: false,
      pattern: 'components',
    },
  ],

  app: {
    head: {
      title: 'Buy List',
      meta: [{ name: 'description', content: 'A simple buy list application' }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      display: 'standalone',
      orientation: 'portrait',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      scope: '/',
      name: 'Buy List',
      short_name: 'BuyList',
      description: 'A simple buylist',
      icons: [
        {
          src: '/icons/app/192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/app/512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },

    workbox: {
      navigateFallback: '/html/offline.html',
    },

    devOptions: {
      enabled: true,
    },
  },

  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
});
