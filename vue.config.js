module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  css: {
    extract: true, // 是否要抽離 css，若為否，所有 css 都會內聯在 js 中。預設為 true
    sourceMap: process.env.VUE_APP_ENV !== 'production' // 是否要生成 sourceMap，預設為 false。建議在開發情況下打開
  },
  configureWebpack: {
    performance: {
      hints: false, // 決定是否開啟效能警告
      maxEntrypointSize: 512000, // 預設值為 244Kib，若超過會跳警告
      maxAssetSize: 512000
    }
  },
  productionSourceMap: false
}
