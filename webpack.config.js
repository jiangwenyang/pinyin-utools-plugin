const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'app', 'index'),
    preload: path.join(__dirname, 'app', 'preload')
  },
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: path.join(__dirname, 'dist'),
    filename: chunkData =>
      chunkData.chunk.name === 'preload' ? 'preload.js' : '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        include: [path.resolve(__dirname, 'app')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.ts', '.jsx', '.tsx']
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: '汉字转拼音',
      template: path.resolve(__dirname, 'public', 'index.html'),
      excludeChunks: ['preload']
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [
          {
            source: path.resolve(__dirname, 'dist', 'index.html'),
            destination: __dirname
          },
          {
            source: path.resolve(__dirname, 'dist', 'preload.js'),
            destination: __dirname
          }
        ]
      }
    })
  ]
};
