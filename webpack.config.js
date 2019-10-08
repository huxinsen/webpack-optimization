const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 把 css 提取到单独的文件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html 文件并且引入打包后的文件
const glob = require('glob') // 查找匹配的文件
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin') // 删除无意义的 css，需配合 mini-css-extract-plugin
const AddAssetHtmlCdnPlugin = require('add-asset-html-cdn-webpack-plugin') // 添加 cdn

module.exports = env => {
  return {
    mode: env,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      // 出口必须是绝对路径，（保险起见都用绝对路径）
      path: path.resolve(__dirname, 'dist'),
    },
    externals: {
      // 作用：对第三方库的用法不变，但不打包第三方库，从而加速 webpack 的打包速度
      jquery: 'jQuery',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              // 也可写在 .babelrc 里
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            env !== 'development'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            'file-loader',
            env !== 'development' && {
              // 使用 file-loader 之前，对图片进行压缩
              loader: 'image-webpack-loader',
              // options: {
              //   mozjpeg: {
              //     progressive: true,
              //     quality: 65,
              //   },
              //   // optipng.enabled: false will disable optipng
              //   optipng: {
              //     enabled: false,
              //   },
              //   pngquant: {
              //     quality: [0.65, 0.9],
              //     speed: 4,
              //   },
              //   gifsicle: {
              //     interlaced: false,
              //   },
              //   // the webp option will enable WEBP
              //   webp: {
              //     quality: 75,
              //   },
              // },
            },
          ].filter(Boolean),
        },
      ],
    },
    plugins: [
      env !== 'developmemt' && new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: 'index.html',
      }),
      new PurgeCssWebpackPlugin({
        paths: glob.sync('./src/**/*', { nodir: true }),
      }),
      new AddAssetHtmlCdnPlugin(true, {
        jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
      }),
    ].filter(Boolean),
  }
}
