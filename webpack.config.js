const path = require('path');

const entry = './src/js/main.tsx';

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
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
        test: /\.tsx?$/,
        loader: 'ts-loader',
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
