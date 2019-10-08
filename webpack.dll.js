const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin') // 生成库列表 manifest.json

module.exports = {
  mode: 'production',
  entry: ['react', 'react-dom'],
  output: {
    // 打包后接收自执行函数的名字叫 react
    library: 'react',
    // 默认用 var 模式
    // libraryTarget: 'commonjs2',
    filename: 'react.dll.js',
    path: path.resolve(__dirname, 'dll'),
  },
  plugins: [
    new DllPlugin({
      name: 'react',
      path: path.resolve(__dirname, 'dll/manifest.json'),
    }),
  ],
}

// 动态链接库（dll）可用于生产环境，一般用于开发环境
// 流程：使用语法 import React from 'react' => 查找 manifest.json 文件 => 查找 dll.js 文件
// 使用 DllPlugin 可以大幅度提高构建速度
