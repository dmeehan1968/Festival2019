import path from 'path'
import paths from '../paths'
import loaders from './loaders.js'
import ManifestPlugin from 'webpack-manifest-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

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
    path: paths.clientBuild,
    filename: 'client.bundle.js',
    publicPath: paths.publicPath,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
 },
 module: {
   rules: loaders.client,
 },
 plugins: [
   new ManifestPlugin(),
   new CleanWebpackPlugin(),
   new MiniCssExtractPlugin({
      filename:
          process.env.NODE_ENV === 'development' ? 'client.[name].css' : 'client.[name].[contenthash].css',
      chunkFilename:
          process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[contenthash].css',
  }),
 ],
}
