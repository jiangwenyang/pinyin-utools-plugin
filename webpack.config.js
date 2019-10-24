const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './preload.js',
  output: {
    filename: 'preload.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'electron-renderer',
  plugins: [
    new FileManagerPlugin({
      onStart: {
        delete: ['./dist']
      },
      onEnd: {
        copy: [
          {
            source: './assets',
            destination: './dist/assets'
          },
          {
            source: './{plugin.json,index.html,README.md,logo.png}',
            destination: './dist/'
          }
        ]
      }
    })
  ],
  optimization: {
    minimize: true
  }
};
