const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pwa: {
    name: 'Jenawe',
    themeColor: '#42b983',
    msTileColor: 'var(--dark);000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      background_color: '#ffffff',
      icons: [
        {
          src: 'img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },
  transpileDependencies: []
})
