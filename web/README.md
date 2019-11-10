## 项目介绍
基于 Vue-cli3 搭建的前端开发脚手架项目模板，主要包括有以下内容：Webpack4.x 性能调优配置，Vue.js 全家桶，移动端 vw 适配，单元测试等功能，仅供参考，欢迎大家围观指教！

## 项目特点
[![license](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)](https://github.com/vuejs/vue)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/liangfengbo/vue-cli3-template/blob/master/LICENSE)

## 特征
- [x] Babel
- [x] VueRouter
- [x] Vuex
- [x] CSS 预编译工具：Less
- [x] HTTP 库：Axios
- [x] 代码规范：Linter
- [x] 移动端 vw 适配：postcss-px-to-viewport
- [x] 优化 babel-loader，开启 cacheDirectory
- [x] 使用 Happypack将 loader 由单进程转为多进程，加快编译速度
- [x] 文件结构可视化：webpack-bundle-analyzer
- [x] 业务代码和第三方库区分打包：DllPlugin  
- [x] 删除冗余代码：UglifyJsPlugin 
- [x] 开启 Gizp 压缩：compression-webpack-plugin 
- [x] 单元测试

## 安装及快速开始
```
# 克隆项目
$ git clone https://github.com/liangfengbo/vue-cli3-template

# 进入目录
$ cd vue-cli3-template

# 安装依赖包
$ yarn install

# 启动项目
$ yarn serve

# 依赖包 Dll 打包
$ yarnr run dll

# 项目构建打包
$ yarn run build

# 项目构建打包分析
$ yarn run build --report

# Eslint检测
$ yarn run lint

# 单元测试
$ yarn run test:unit
```

## FAQ
1. 没有yarn环境，npm 可以吗？ 
> 答：可以的，建议使用 yarn，yarn 比 npm 速度快，主要是安装版本统一。
2. vue.config.js 里面的一些配置可以不需要吗？或者我新增一些配置可以吗？
> 答：可以的，你可以根据你的实际需要进行修改或增删配置的，比如你不需要 开启 Gizp 压缩，你在 vue.config.js 里面删除 开启gzip 内容即可。且 env 文件, 代理服务器的接口或转发路径，这些肯定需要改为你实际开发中的接口路径的。
3. ... 更多问题请到 [Issues](https://github.com/liangfengbo/vue-cli3-template/issues)查阅，或者有问题请到 [Issues 提问](https://github.com/liangfengbo/vue-cli3-template/issues/new)，我会及时回复的，如果对你有帮助，请你点个 star 鼓励一下，谢谢！共勉！
### MIT
[@梁凤波](https://github.com/liangfengbo/vue-cli3-template/blob/master/LICENSE)
