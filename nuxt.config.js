const axios = require('axios')

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/nuxt-helloworld-static/'
  }
} : {}

module.exports = {
  ...routerBase,
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-helloworld',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt demo helloworld' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/axios',
  ],
  generate: {
    routes: function () {
      return axios.get('https://kitsu.io/api/edge/anime')
        .then((res) => {
          return res.data.data.map((item) => {
            return {
              route: '/' + item.id,
              payload: item
            }
          })
        })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

