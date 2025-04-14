export default defineNuxtConfig({
  compatibilityDate: "2024-11-27",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  experimental: { typedPages: true },
  future: { compatibilityVersion: 4 },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
})
