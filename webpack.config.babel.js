import path from 'path';
import webpack from 'webpack';
<<<<<<< HEAD
import WriteFilePlugin from 'write-file-webpack-plugin';
=======

var BundleTracker = require('webpack-bundle-tracker');
var ip = require('ip');
>>>>>>> 05f6f64fd11b08e711b08523edc1e7c382d417b1

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

<<<<<<< HEAD
const PUBLIC_PATH='/';
const hotReload = process.env.HOT_RELOAD === '1';

module.exports = {
  context: __dirname,
  entry: './frontend/index.js',
=======
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = (NODE_ENV === 'production');
const isDevelopment = (NODE_ENV === 'development');
const PORT = process.env.PORT || 3000;
const HOST = isDevelopment ? 'localhost' : ip.address();

const PUBLIC_PATH='/Atlas/static/bundles/local/';
const hotReload = process.env.HOT_RELOAD === '1';

module.exports = {
  entry: {main: isDevelopment ?
        [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-dev-server/client?' + 'http://' + HOST + ':' + PORT,
            'webpack/hot/only-dev-server',
            './frontend/index.js',
        ]
        :
        [
            'babel-polyfill',
            './frontend/index.js'
        ]
        },
>>>>>>> 05f6f64fd11b08e711b08523edc1e7c382d417b1
  module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
<<<<<<< HEAD
                use: [
                    {
                    loader: 'babel-loader',
                    options: {
                       cacheDirectory: true
                        }
                    },
                    {
                    loader: 'react-hot-loader/webpack'
                    }
                ]
=======
                use: {
                    loader: 'babel-loader',

                }
>>>>>>> 05f6f64fd11b08e711b08523edc1e7c382d417b1
            },
            {
                test: /\.global\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                    ]
            },
            {
                test: /^((?!\.global).)*\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    }
                    ]
            },
            // SASS support - compile all .global.scss files and pipe it to style.css
            {
                test: /\.global\.(scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                    ]
            },
            // SASS support - compile all other .scss files and pipe it to style.css
            {
                test: /^((?!\.global).)*\.(scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                    ]
            },
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            // TTF Font
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader'
            },
            // SVG Font
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml'
                    }
                }
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: 'url-loader'
            }
            ],
  },
  resolve: {
    modules: ['node_modules', 'bower_components'],
    extensions: ['*', '.js', '.jsx', '.json', '.css']
  },

  output: {
<<<<<<< HEAD
      filename: "[name]-[hash].js"

  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WriteFilePlugin(),
    new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        alias: { 'react-dom': '@hot-loader/react-dom'  }
        }
    })
  ],
=======
      path: isDevelopment ? PUBLIC_PATH : path.resolve('.' + PUBLIC_PATH),
      filename: "[name]-[hash].js",
      publicPath: isDevelopment ? 'http://'+ HOST + ':'+ PORT + PUBLIC_PATH : '',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
  ], // add all common plugins here

>>>>>>> 05f6f64fd11b08e711b08523edc1e7c382d417b1
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
<<<<<<< HEAD
          name: 'Atlas_Project',
=======
          name: 'main',
>>>>>>> 05f6f64fd11b08e711b08523edc1e7c382d417b1
          chunks: 'all',
        },
      }
    }
<<<<<<< HEAD
=======
  },

  devtool: isDevelopment ? 'inline-source-map': false,
  devServer: {
   port: PORT,
   publicPath: PUBLIC_PATH,
   hot: true,
   inline: true,
   historyApiFallback: true,
   disableHostCheck: true,
   compress:true,
   headers: {
      'Access-Control-Allow-Origin': '*',
    }


>>>>>>> 05f6f64fd11b08e711b08523edc1e7c382d417b1
  }
}
