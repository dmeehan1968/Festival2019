import path from 'path'
import paths from '../paths'
import loaders from './loaders'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

export default {
  name: 'server',
  target: 'node',
  entry: {
    bundle: [
      path.resolve(paths.srcServer, 'index.js'),
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
   new ExtractTextPlugin(path.resolve(paths.serverBuild, paths.publicPath, 'style.css'))
 ]
}
