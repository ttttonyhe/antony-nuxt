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
    },
    {
      src: '@/plugins/ga.js',
      ssr: false,
      mode: 'client'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }]
  ],
  /*
   ** Nuxt.js PWA configuration
   */
  manifest: {
    name: "TonyHe's Blog",
    short_name: "TonyHe",
    description: "Just A Poor Lifesinger",
    background_color: "#f6f7f8",
    theme_color: "#f1f2f3",
    lang: "zh",
    start_url: "/"
  },
  render: {
    resourceHints: false,
    http2: {
      push: true
    },
    static: {
      maxAge: "1y",
      setHeaders(res, path) {
        if (path.includes("sw.js")) {
          res.setHeader("Cache-Control", `public, max-age=${15 * 60}`);
        }
      }
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit',
    "@nuxtjs/pwa",
    'nuxt-precompress'
  ],
  markdownit: {
    injected: true,
    linkify: true
  },
  // Compression configuration
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: true, // set false to turn off console messages
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true, 
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },
 
    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 }
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
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
    analyze: false,
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", {
          legacy: true
        }],
        ["@babel/plugin-proposal-class-properties", {
          loose: true
        }]
      ]
    },
    extractCSS: true,
    maxChunkSize: 500000,
    productionSourceMap: false,
    productionGzip: true,
    /*
     ** You can extend webpack config here
     */
    extend() {}
  }
}
