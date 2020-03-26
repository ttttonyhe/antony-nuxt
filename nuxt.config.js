module.exports = {
  loading: false,
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'TonyHe - Just A Poor Lifesinger',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'TonyHe\'s Personal Blog'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  // Import Global Stylesheet
  css: [
    '~/assets/css/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/cookie',
    '~/plugins/i18n',
    {
      src: '@/plugins/route',
      ssr: false
    },
    {
      src: '@/plugins/gotop',
      ssr: false
    },
    {
      src: '@/plugins/contents',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true,
    linkify: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    maxChunkSize: 500000,
    productionSourceMap: false,
    productionGzip: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
