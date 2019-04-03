import webpack from 'webpack'
import clientBase from './client.base'

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
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  devtool: 'source-map',
}
