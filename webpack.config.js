const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

const clientConfig = {
    entry: ['react-devtools', './client/index.js'],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'public/client.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                  }
                }
            }
        ]
    }
}


const serverConfig = {
    entry: ['@babel/polyfill', './server/index.js'],
    target: "node",
    mode: 'development',
    devtool: "source-map",
    externals: [nodeExternals()],
    node: {
      __dirname: false,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env','@babel/preset-react']
                }
              }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
        }),
        new NodemonPlugin(),
    ]
}

module.exports = [clientConfig, serverConfig]
