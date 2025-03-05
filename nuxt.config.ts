// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000/api"
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: ["@sentry/nuxt/module", "@pinia/nuxt"],
  
  sentry: {
    sourceMapsUploadOptions: {
      org: "metalify",
      project: "metalify",
    },
    autoInjectServerSentry: "top-level-import",
  },
  sourcemap: { client: "hidden" },

  vite: {
    plugins: [
      vuetify({
        autoImport: true,
      }),
    ],
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})