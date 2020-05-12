const webpack = require('webpack')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'inDemo',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'inDemo'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css' },
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js'}
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    {src: '~/assets/styles/main.scss', lang: 'sass'},
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */

 modules: [
  [
    'nuxt-i18n',
    {
      locales: [
        {
          code: 'en',
          iso: 'en'
        },
      ],
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en',
      },
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'offy_i18n_redirected',
        alwaysRedirect: false,
        fallbackLocale: 'en'
      },
    },
  ],
  [
    '@tui-nuxt/editor'
  ],
  [
    'bootstrap-vue/nuxt',
  ],
  [
    '@nuxtjs/auth',
  ],
  [
    '@nuxtjs/proxy',
  ],
  [
    '@nuxtjs/axios',
    {
      baseURL: 'https://api-mxh.herokuapp.com',    
      requestInterceptor: (config, {store}) => {
        config.headers.common['token'] = store.state.user.headers.token
        return config
      },                        
    }
  ],
],

  auth:{
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/login/admin', method: 'post', propertyName: 'token'},
          user: false,
        }
      },
      tokenRequired: true,
      tokenType: "Bearer"
    }
  },
}
