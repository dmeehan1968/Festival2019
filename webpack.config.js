const webpack = require('webpack')
const path = require('path')

const clientConfig = require('./webpack/client.config')
const serverConfig = require('./webpack/server.config')

const config = {
  distDir: path.resolve(__dirname, './dist'),
  includes: [
    path.resolve(__dirname, './src')
  ]
}

module.exports = [clientConfig(config), serverConfig(config)]
