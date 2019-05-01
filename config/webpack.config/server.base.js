import path from 'path'
import paths from '../paths'
import loaders from './loaders'
import nodeExternals from 'webpack-node-externals'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import resolve from './resolve'
import DotEnv from 'dotenv-webpack'

export default {
  name: 'server',
  target: 'node',
  entry: {
    bundle: [
      require.resolve('@babel/polyfill'),
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
     new DotEnv(),
     new CleanWebpackPlugin(),
     new MiniCssExtractPlugin({
        filename: 'server.[name].css',
        chunkFilename: '[id].css',
    }),
  ],
  ...resolve,
}
