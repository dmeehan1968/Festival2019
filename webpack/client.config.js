const path = require('path')
const validateConfig = require('./validateConfig')

module.exports = function(config) {
  validateConfig(config)
  return {
      entry: ['react-devtools', './src/node_modules/client/index.js'],
      mode: 'development',
      output: {
          path: config.distDir,
          filename: 'public/client.bundle.js'
      },
      module: {
          rules: [
            {
              test: /\.less$/,
              include: config.includes,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    importLoaders: 1,
                    sourceMap: true,
                    localIdentName: '[name]_[local]_[contenthash:base64:5]',
                    camelCase: true,
                  },
                },
                'less-loader',
              ],
            },
            {
                test: /\.(js|jsx)$/,
                include: config.includes,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                  }
                }
            }
          ]
      }
  }
}
