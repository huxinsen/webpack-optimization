// 有副作用的代码，可能开发时是无意义的
// 不使用副作用代码，可在 package.json 中配置："sideEffects": false
// 由于 css 文件不是副作用，不需移除，所以在 package.json 中配置："sideEffects": ["**/*.css"]
import { test } from './test'
export const add = (a, b) => {
  return a + b + ' sum'
}

export const minus = (a, b) => {
  return a - b + ' minus'
}
