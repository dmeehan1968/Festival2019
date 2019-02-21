const webpack = require('webpack')
const path = require('path')

const clientConfig = require('./webpack/client.config')
const serverConfig = require('./webpack/server.config')

const config = {
  distDir: path.resolve(__dirname, './dist')
}

module.exports = [clientConfig(config), serverConfig(config)]
