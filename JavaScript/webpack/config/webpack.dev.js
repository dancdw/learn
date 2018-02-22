const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

process.env.NODE_ENV = 'Development'

module.exports = merge(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "../src/asset"),
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map', // 生成 source map 映射
  devServer: { // 开启静态服务器
    // contentBase: './dist',
    // port: 9000
  },
  plugins: [
    new webpack.DefinePlugin({ // 设置环境变量，在 src 目录里使用
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({ // 生成 html 文件
      title: process.env.NODE_ENV,
    }),
    new webpack.NamedModulesPlugin(),
  ],
})