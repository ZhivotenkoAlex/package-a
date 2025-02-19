const webpack = require('webpack')
const { defineConfig } = require('@vue/cli-service')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        __VUE_PROD_DEVTOOLS__: false,
      }),
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
