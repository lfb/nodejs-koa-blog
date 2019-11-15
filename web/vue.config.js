const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
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
      // 上线压缩去除console等信息
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         // 删除所有的console语句
      //         drop_console: true,
      //         // 把使用多次的静态值自动定义为变量
      //         reduce_vars: true,
      //         drop_debugger: false,
      //         pure_funcs: ['console.log'] // 移除console
      //       },
      //       output: {
      //         // 使输出的代码尽可能紧凑
      //         beautify: false
      //       }
      //     },
      //     sourceMap: false,
      //     // 允许并发
      //     parallel: true,
      //     // 开启缓存
      //     cache: true
      //   })
      // )
      // 开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      // const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|tiff)(\?.*)?$/i
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: productionGzipExtensions,
      //     threshold: 10240,
      //     minRatio: 0.8
      //   })
      // )
      // 配置 dll 文件
      config.plugins.push(
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require('./public/vendor/vendor-manifest.json')
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: path.resolve(__dirname, './public/vendor/*.js'),
          // dll 引用路径
          publicPath: './vendor',
          // dll最终输出的目录
          outputPath: './vendor'
        })
      )
      // 打包后模块大小分析
      if (process.env.npm_config_report) {
        config.plugins.push(new BundleAnalyzerPlugin())
      }

      // happyBabel
      config.plugins.push(new HappyPack({
        // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
        id: 'happyBabel',
        // 指定进程池
        threadPool: happyThreadPool,
        loaders: ['babel-loader?cacheDirectory']
      }))
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
