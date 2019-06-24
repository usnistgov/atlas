import path from 'path';
const merge = require('webpack-merge');
const config = require('./webpack.config.babel.js')

const PUBLIC_PATH='/static/bundles/development/';
var BundleTracker = require('webpack-bundle-tracker');

var developmentConfig = merge(config, {

  mode: 'development',
  entry: {
      Atlas_Project:
        [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './frontend/index.js',
        ]
        },
  devtool: 'inline-source-map',
  devServer: {
   host: 'localhost',
   port: 3000,
   disableHostCheck: true,
   compress: true,
   noInfo: true,
   stats: 'errors-only',
   inline: true,
   lazy: false,
   hot: true,
   headers: { 'Access-Control-Allow-Origin': '*' },
   contentBase: path.join(__dirname, 'frontend'),
   watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
},
    }
  }
)

developmentConfig.output.path =  path.join(__dirname, PUBLIC_PATH),
developmentConfig.output.publicPath = 'http://localhost:3000' + PUBLIC_PATH

developmentConfig.plugins.push(new BundleTracker({filename: './webpack-stats.json'}));

module.exports = developmentConfig;