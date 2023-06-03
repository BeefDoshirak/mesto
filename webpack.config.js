const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: {
    open: true,
    port: 8080,
    compress: true,
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/'
          },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader']
        },
        {
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'images/[hash][ext]',
            }
        },
        {
            test: /\.(woff2)$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[hash][ext]',
            }
        }
      ], 
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin( {
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
  ]
};