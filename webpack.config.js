const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WatchIgnorePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  watch: true,
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              minimize: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.css']
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: '汉字转拼音',
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new FileManagerPlugin({
      onStart: {
        delete: [path.resolve(__dirname, 'build')]
      },
      onEnd: {
        copy: [
          {
            source: path.resolve(__dirname, 'build', 'index.html'),
            destination: __dirname
          }
        ]
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false
    }),
    new WatchIgnorePlugin([/css\.d\.ts$/])
  ]
};
