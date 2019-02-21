module.exports = function(config) {
  return {
      entry: ['react-devtools', './client/index.js'],
      mode: 'development',
      output: {
          path: config.distDir,
          filename: 'public/client.bundle.js'
      },
      module: {
          rules: [
            {
              test: /\.less$/,
              exclude: /node_modules/,
              use: [
                'style-loader',
                'css-loader',
                'less-loader',
              ],
            },
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
}
