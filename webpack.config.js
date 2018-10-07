const path = require('path');
const webpack = require('webpack');

const entry = './src/js/main.jsx';
const jsPath = path.join(__dirname, 'src', 'js');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  entry,
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: jsPath,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
    },
  },
};
