const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 9595; // TODO: get this variable from setting.ts
const name = '来了老弟...'; // TODO: get this variable from setting.ts

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    host:'0.0.0.0',
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:8888`,
        changeOrigin: true, // 是否跨域
        secure: false,
        ws: false,
        pathRewrite: {
          ['^'+process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  pluginOptions: {
    // style样式资源处理器，在style资源中注入内容，导入css / sass / scss / less / stylus这些内容
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  configureWebpack(config) {
     // 在webpack的name字段中提供应用程序的标题
    // 可以在index.html中访问它来注入正确的标题。
    config.name = name;

    Object.assign(config, {
      resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
          '@': resolve('src')
        }
      }
    })
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name);

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-source-map')
    );

    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk('single');
    });
  }
};
