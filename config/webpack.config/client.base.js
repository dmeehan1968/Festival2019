import path from 'path'
import paths from '../paths'
import loaders from './loaders.js'
import ManifestPlugin from 'webpack-manifest-plugin'

export default {
  name: 'client',
  target: 'web',
  entry: {
    bundle: [
      require.resolve('@babel/polyfill'),
      path.join(paths.srcClient, 'index.js'),
    ],
  },
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: 'client.bundle.js',
    publicPath: paths.publicPath,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
 },
 module: {
   rules: loaders.client,
 },
 plugins: [
   new ManifestPlugin(),
 ],
}
