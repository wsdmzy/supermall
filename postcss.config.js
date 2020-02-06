module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗宽度
      viewportHeight: 667,  //视窗高度
      unitPrecision: 5, //指定转换保留的小数位
      viewportUnit: 'vw', //指定转换的视窗单位 建议vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //不需要转换的
      minPixeValue: 1, //小于等于1px不转换
      mediaQuery: false //允许在媒体查询中转换px
    }
  }
}
