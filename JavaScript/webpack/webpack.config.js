// import path from "path"
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 清除目录
    new HtmlWebpackPlugin({ // 生成 html 文件
      title: 'Output Management',
    }),
  ],
  output: {
    filename: '[name].bundle.js', // 根据入口名称生成输出文件名
    path: path.resolve(__dirname, 'dist')
  },
}