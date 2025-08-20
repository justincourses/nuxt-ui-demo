// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils'
  ],

  css: ['~/assets/css/main.css'],

  // 环境变量配置
  runtimeConfig: {
    // 服务器端环境变量
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    // 公共环境变量（会暴露给客户端）
    public: {
      // 如果需要在客户端使用某些环境变量，可以在这里添加
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})
