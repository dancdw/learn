const merge = require('webpack-merge')
const base = require('./config/webpack.base.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'Production'

module.exports = merge(base, {
  // devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({ // 设置环境变量，在 src 目录里使用
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({ // 生成 html 文件
      title: process.env.NODE_ENV,
    }),
    // new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ // 将第三方模块提取成新的 Chunk
      name: 'vendor', 
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 将公共模块提取成新的 Chunk
      name: 'manifest', 
    }),
    new CleanWebpackPlugin(['./dist']), // 清除目录
    new UglifyJSPlugin({ // tree shaking
      // sourceMap: true,
    }),
  ],
})