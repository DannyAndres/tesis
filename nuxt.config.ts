import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  publicRuntimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  privateRuntimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
});
