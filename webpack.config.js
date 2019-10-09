const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = env => {
  return {
    mode: env,
    entry: './src/index.js',
    devServer: {
      hot: true,
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      // 不解析 jquery 中的依赖库
      // 对于这类不引用其他包的库，打包的时候没有必要去解析，因此能够提高打包速率
      noParse: /jquery/,
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // 指定哪些文件不通过loader
          include: path.resolve(__dirname, 'src'), // 指定哪些文件通过loader
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: ['file-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: 'index.html',
      }),
      new webpack.NamedModulesPlugin(), // 打印更新的模块路径
      new webpack.HotModuleReplacementPlugin(), // 热更新插件
    ],
  }
}
