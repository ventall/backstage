const path = require("path")
// const CompressionPlugin = require('compression-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '',
  chainWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
    //   //按需打包lodash函数
    //   config.plugin('lodash-webpack-plugin').use(require('lodash-webpack-plugin'))
    // }
    // config.plugins.delete('prefetch')
    // //压缩代码
    // config.optimization.minimize(true)
    // config.externals({
    //   'wangeditor': 'wangEditor',
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vue-wordcloud': 'WordCloud',
    //   'vuescroll': 'vuescroll'
    // })
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("pages", resolve("src/pages"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public"));
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3300',
        changeOrigin: true,//允许跨域
        pathRewrite: { '^/api': '' },
      },
    },
  }
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     return {
  //       plugins: [
  //         new CompressionPlugin({
  //           test: /\.js$|\.css$|\.html$/,
  //           algorithm: 'gzip',
  //           threshold: 10240,
  //           deleteOriginalAssets: false,
  //         })
  //       ]
  //     }
  //   }
  // }
}