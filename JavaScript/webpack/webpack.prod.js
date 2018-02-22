const merge = require('webpack-merge')
const base = require('./config/webpack.base.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

process.env.NODE_ENV = 'Production'
// process.env.production = true

module.exports = merge(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "../src/asset"),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader' ]
        }),
      },
    ],
  },
  // devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({ // 提取 css 文件
      filename: '[name].css'
    }),
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
      minChunks: Infinity,
    }),
    new CleanWebpackPlugin(['./dist']), // 清除目录
    new UglifyJSPlugin({ // tree shaking
      // sourceMap: true,
    }),
  ],
})