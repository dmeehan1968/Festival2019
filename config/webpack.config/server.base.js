import path from 'path'
import paths from '../paths'
import loaders from './loaders'
import nodeExternals from 'webpack-node-externals'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import resolve from './resolve'

export default {
  name: 'server',
  target: 'node',
  entry: {
    bundle: [
      path.join(paths.srcServer, 'index.js'),
    ],
  },
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals(),
  ],
  output: {
    path: paths.serverBuild,
    filename: 'server.bundle.js',
    publicPath: paths.publicPath,
  },
  module: {
   rules: loaders.server,
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: 'server.[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  ...resolve,
  stats: 'normal',
}
