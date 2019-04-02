import webpack from 'webpack'
import serverBase from './server.base'

export default {
  ...serverBase,
  mode: 'development',
  plugins: [
    ...serverBase.plugins,
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      test: /\.js$/,
      raw: true,
      entryOnly: false
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
