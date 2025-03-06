// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "/api",
      sentry: {
        dsn: process.env.SENTRY_DSN || "",
      },
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: ["@sentry/nuxt/module", "@pinia/nuxt", "@nuxthub/core"],
  
  sentry: {
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.SENTRY_ENABLED === "true",
    environment: process.env.NUXT_ENV,
    autoSessionTracking: true,
    attachStacktrace: true,
    tracing: true,
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
  nitro: {
    preset: "cloudflare_pages",
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})