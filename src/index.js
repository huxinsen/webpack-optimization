import str from './source'
console.log(str)
// 如果支持热更新
if (module.hot) {
  // 当入口文件变化后重新执行当前入口文件
  module.hot.accept('./source', () => {
    let str = require('./source')
    console.log(str)
  })
}
