const path = require('path')
// const webpack = require('webpack')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
    if (isProduction) {
      // 开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|tiff)(\?.*)?$/i
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      // 打包后模块大小分析
      if (process.env.npm_config_report) {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    }
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
