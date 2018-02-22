// import path from "path"
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: { // 多个入口
    app: './src/index.js',
    print: './src/asset/print.js',
  },
  // devtool: 'inline-source-map', // 生成 source map 映射
  devServer: { // 开启静态服务器
    contentBase: './dist',
    port: 8080
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 清除目录
    // new UglifyJSPlugin(),
    new HtmlWebpackPlugin({ // 生成 html 文件
      title: 'React.js',
    }),
  ],
  output: {
    filename: '[name].bundle.js', // 根据入口名称生成输出文件名
    path: path.resolve(__dirname, '../dist'), // 文件的输出路径
    publicPath: '/', // 确保文件资源能正常访问
  },
}