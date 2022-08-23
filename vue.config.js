const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  // 开启代理服务、
  devServer: {
    // 这个代理写的是端口的数据
    proxy: 'http://localhost:8080'
  }
})
