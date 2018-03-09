// import path from "path"
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
  return {
    context: __dirname,
    entry: {
      app: '../src/index.js',
      // print: './src/asset/print.js',
      vendor: ['lodash', 'react', 'react-dom'],
    },
    module: {
      rules: [
        // {
        //   test: /\.tsx?$/,
        //   include: path.resolve(__dirname, "../src"),
        //   use: 'ts-loader',
        //   exclude: /node_module/,
        // },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: path.resolve(__dirname, "../src"),
          use: [
            {
              loader: 'babel-loader?cacheDirectory=true',
              options: {
                presets: ['babel-preset-react'],
              }
            },
            // {
            //   loader: 'eslint-loader',
            //   options: {
            //     baseConfig: path.resolve(__dirname, "../"),
            //   }
            // },
          ],
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, "../src"),
          use: (env && env.production) ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader' ]
          }) : [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          include: path.resolve(__dirname, "../src"),
          use: [
            'file-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name].[chunkhash].js', // 根据入口名称生成输出文件名
      path: path.resolve(__dirname, '../dist'), // 文件的输出路径
      publicPath: '/', // 确保文件资源能正常访问
    },
  };
};