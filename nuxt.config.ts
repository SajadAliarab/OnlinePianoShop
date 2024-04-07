// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', '@pinia/nuxt'],

runtimeConfig: {
STRIPES_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
ENDPOINT_SECRET: process.env.ENDPOINT_SECRET,
public:{
STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
}
}
})