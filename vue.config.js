const { defineConfig } = require('@vue/cli-service')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin

module.exports = defineConfig({
  // publicPath: 'http://localhost:8081/',
  publicPath: 'https://package-a.web.app/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'packageA',
        filename: 'remoteEntry.js',
        exposes: {
          './TextA': './src/components/TextDisplayA.vue'
        },
        shared: {
          vue: {
            singleton: true,
            eager: true,
            requiredVersion: '^3.2.13'
          }
        }
      })
    ]
  },
  devServer: {
    port: 8081,
    hot: true
  }
})
