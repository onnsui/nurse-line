export default {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'NURSE LINE',
    titleTemplate: '%s | NURSE LINE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'NURSE LINE | 忙しい看護師の仕事とプライベートをもっと輝かせるサイトです。',
      },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-scrollto.js',
    { src: '@/plugins/vue-social-sharing.js', mode: 'client' },
    { src: '@/plugins/swiper.js', ssr: false },
  ],
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/main.css',
    'swiper/dist/css/swiper.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'vue-scrollto/nuxt',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://wp.nurse-line.net',
  },
  router: {
    base: '/',
  },
  /*
   ** Build configuration
   */
  build: {
    hardSource: true,
    transpile: [/^element-ui/],
    // vendor: ['vue-awesome-swiper'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
