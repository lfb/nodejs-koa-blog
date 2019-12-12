const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://homestead.test/api',
        pathRewrite: {'^/api': ''}
      }
    }
  },
  configureWebpack: config => {

  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!isProduction,
    // 开启 CSS source maps
    sourceMap: !!isProduction,
    // css预设器配置项
    loaderOptions: {}
  },
  // 链式操作  https://github.com/neutrinojs/webpack-chain
  chainWebpack: config => {
    config.module
      .rule('compile')
      .test(/\.js$/)
      .include
      .add(resolve('src'))
      .add(resolve('tests'))
      .end()
      .exclude
      .add(/node_modules/)
      .add(/bower_components/)
      .add(/dist/)
      .end()
      .use('babel')
      .loader('happypack-loader?id=happyBabel')
      .loader('babel-loader?cacheDirectory=true')
      .options({
        presets: [
          ['@babel/preset-env', {modules: false}]
        ]
      })
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/css/common.less')
      ]
    }
  }
}
