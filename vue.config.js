const path = require('path')
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: '/yxjc/geo/',
  outputDir: 'geo',
  assetsDir: 'static',
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      sass: {

      },
      scss: {
      }
    }
  },

  devServer: {
    open: true,
    host: 'localhost',
    port: 8082,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        ws: true, // 是否启用websockets
        changeOrigin: true,  // 代理时是否更改host
        pathRewrite: {
          '^/api': '' //这里理解成用'/api'代替target里面的地址
        }
      },
      '/shengfagai': {
        target: 'http://localhost:8090',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/shengfagai': '/shengfagai'
        },
      },
    }
  },

  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'assets': path.resolve('src/assets'),
        'components': path.resolve('src/components'),
        'views': path.resolve('src/views'),
        'store': path.resolve('src/store'),
        'router': path.resolve('src/router'),
        'api': path.resolve('src/api'),
        'utils': path.resolve('src/utils'),
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        }
      ]
    },
  }
}