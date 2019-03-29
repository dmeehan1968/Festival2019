const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require( 'nodemon-webpack-plugin' )
const validateConfig = require('./validateConfig')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoader = require('./css-loader.config')

module.exports = function(config) {
  validateConfig(config)
  return {
      entry: ['@babel/polyfill', './src/node_modules/server/index.js'],
      target: "node",
      mode: 'development',
      devtool: "source-map",
      externals: [nodeExternals()],
      node: {
        __dirname: false,
      },
      output: {
          path: config.distDir,
          filename: 'server.bundle.js'
      },
      module: {
          rules: [
            {
              test: /\.less$/,
              include: config.includes,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  cssLoader,
                  'less-loader',
                ],
              }),
            },
            {
              test: /\.(jpg|png|gif)$/,
              include: config.includes,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    emitFile: false,
                  },
                },
              ],
            },
            {
              test: /\.(js|jsx)$/,
              include: config.includes,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                },
              }
            }
          ]
      },
      plugins: [
          new webpack.BannerPlugin({
              banner: 'require("source-map-support").install();',
              test: /\.js$/,
              raw: true,
              entryOnly: false
          }),
          new NodemonPlugin(),
          new ExtractTextPlugin('public/style.css')
      ]
  }

}
