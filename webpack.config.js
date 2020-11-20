const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  mode: 'production',
  module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
},
  output: {
    library: 'pruve',
    libraryExport: 'default',
    libraryTarget: 'window',
    globalObject: 'this',
    filename: 'index.js',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist/browser'),
  },
};
