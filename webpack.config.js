const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const { ContextReplacementPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const dist = path.resolve(__dirname, 'dist')

module.exports = _ => {
  return {
    entry: {
      app: ['./src/index.js']
    },
    output: {
      filename: '[name].[hash].js',
      path: dist,
      publicPath: '/',
      chunkFilename: '[name].[hash].js'
    },
    stats: 'errors-only',
    module: {
      rules: [
        {
          // set up standard-loader as a preloader
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'standard-loader',
          exclude: /(node_modules|bower_components)/,
          options: {
            // config options to be passed through to standard e.g.
            parser: '@babel/eslint-parser'
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(jpg|png|gif|svg|pdf|ico|woff|eot|woff2|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]',
              context: 'src'
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      contentBase: dist,
      compress: true,
      port: 8081,
      open: true,
      hot: true,
      stats: 'errors-only',
      proxy: {
        '/api/**': {
          // target: 'http://localhost:5454',
          target: 'https://api.pro_boa.net',
          secure: false,
          changeOrigin: true
        }
      }
      // https: true
    },
    devtool: 'source-map',
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: './src/templates/index.html',
        filename: './index.html'
      }),
      new ContextReplacementPlugin(/moment[/\\]locale$/, /fr/)],
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'initial',
            enforce: true
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    }
  }
}
