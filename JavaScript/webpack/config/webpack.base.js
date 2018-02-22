// import path from "path"
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(process.env.NODE_ENV)
module.exports = {
  context: __dirname,
  entry: {
    app: '../src/index.ts',
    // print: './src/asset/print.js',
    vendor: ['lodash'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "../src"),
        use: 'ts-loader',
        exclude: /node_module/,
      },
      // {
      //   test: /\.css$/,
      //   include: path.resolve(__dirname, "../src/asset"),
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //   ],
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, "../src/asset"),
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    
  ],
  output: {
    filename: '[name].[chunkhash].js', // 根据入口名称生成输出文件名
    path: path.resolve(__dirname, '../dist'), // 文件的输出路径
    publicPath: '/', // 确保文件资源能正常访问
  },
}