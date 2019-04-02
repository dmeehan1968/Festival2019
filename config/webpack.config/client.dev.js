import webpack from 'webpack'
import clientBase from './client.base'
import WriteFileWebpackPlugin from 'write-file-webpack-plugin'

export default {
  ...clientBase,
  entry: {
    bundle: [
      'react-devtools',
      ...clientBase.entry.bundle,
    ],
  },
  plugins: [
    ...clientBase.plugins,
    // new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  devtool: 'source-map',
}
