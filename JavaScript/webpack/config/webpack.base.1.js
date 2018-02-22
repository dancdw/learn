// import path from "path"
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    // print: './src/asset/print.js',
    // vendor: ['lodash'],
  },
  plugins: [
  ],
  output: {
    filename: '[name].[chunkhash].js', // 根据入口名称生成输出文件名
    path: path.resolve(__dirname, '../dist'), // 文件的输出路径
    publicPath: '/', // 确保文件资源能正常访问
  },
}