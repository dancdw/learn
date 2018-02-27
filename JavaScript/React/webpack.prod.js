const merge = require('webpack-merge')
const base = require('./config/webpack.base.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(env) {
  return merge(base(env), {
    // devtool: 'source-map',
    plugins: [
      new ExtractTextPlugin({ // 提取 css 文件
        filename: '[name].css'
      }),
      new webpack.DefinePlugin({ // 设置环境变量，在 src 目录里使用
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({ // 生成 html 文件
        title: env.NODE_ENV,
        template: '../src/index.html',
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
}