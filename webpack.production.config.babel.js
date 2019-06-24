import path from 'path';
const merge = require('webpack-merge');
const config = require('./webpack.config.babel.js')

var ip = require('ip');
var BundleTracker = require('webpack-bundle-tracker');

const PORT = 3000;
const HOST =  ip.address();
const PUBLIC_PATH='/';

var productionConfig = merge(config, {

  mode: 'production',
  devtool: "eval-source-map",
  entry: {
      Atlas_Project:
        [
            'babel-polyfill',
            './frontend/index.js'
        ]
  }
  }
)
productionConfig.output.path =  path.join(__dirname, PUBLIC_PATH)
productionConfig.output.publicPath = "http://" + HOST + ':' + PORT _ PUBLIC_PATH

productionConfig.plugins.push(new BundleTracker({filename: './webpack-stats-prod.json'}));

module.exports = productionConfig;