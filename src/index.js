import React from 'react'
import { render } from 'react-dom'
import './style.css'

import $ from 'jquery'
console.log('$', $)

// tree-shaking（webpack 内置，另外内置 scope hoisting，作用域提升，可以减少代码体积，节约内存）
// 删除无用代码，只支持 es6 语法的静态导入，默认在生产环境下使用
import { minus } from './calc'
console.log(minus(2, 1))

render(<h1 className="title">hello</h1>, document.getElementById('root'))
