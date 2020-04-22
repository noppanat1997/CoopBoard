const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const packageJson = require('../package.json');
const webpack = require('webpack');

module.exports = {
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

  entry: {
    app: './src/index.js'
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '..', 'server', 'dist'),
    filename: '[name]-[contenthash].js'
  },

  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    modules: ['../node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg|ttf|ico)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'font-family': "'Gotham Book'",
                'font-size-base': '18px',

                'layout-header-background': '#f4f4f4',
                'layout-body-background': '#fff',
                'layout-footer-background': '#333',
                'table-header-bg': '#333',
                'table-header-color': '#fff',
                'menu-bg': 'transparent',
                'menu-item-color': '#ddd',

                'primary-color': '#FFCC29'
              },
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // Clean Plugin will clean up old bundles before compile
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: '../coop-board-v1/public/index.html',
      filename: 'index.html',
      // chunks: ['index'],
    }),
    // new webpack.DefinePlugin({
    //   APP_VERSION: JSON.stringify(packageJson.version)
    // })
  ],

  // Compile Information Display
  stats: {
    children: false,
    entrypoints: false,
    modules: false
  },

  // Webpack Dev Server Config
  devServer: {
    // Default config
    contentBase: path.join(__dirname, '..', 'server', 'dist'),
    compress: true,
    hot: false,
    host: '0.0.0.0',
    port: 8080,
    // Enable Write to Disk to allow dev server to recompile
    writeToDisk: true,
    // Let index.html handle any paths
    publicPath: '/',
    // historyApiFallback: true,
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/static': { target: 'http://localhost:8000', changeOrigin: true }
    }
  }
};
