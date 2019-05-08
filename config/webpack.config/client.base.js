import path from 'path'
import paths from '../paths'
import loaders from './loaders.js'
import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import resolve from './resolve'
import DotEnv from 'dotenv-webpack'

export default {
  name: 'client',
  target: 'web',
  entry: {
    bundle: [
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
 optimization: {
   namedModules: true,
   noEmitOnErrors: true,
   splitChunks: {
     chunks: 'all',
     maxInitialRequests: Infinity,
     minSize: 10 * 1024,
     automaticNameDelimiter: '.',
     cacheGroups: {
       vendor: {
         test: /[\\/]node_modules[\\/]/,
         name(module) {
           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `vendor.${packageName.replace('@', '')}`;
         }
       },
     },
   },
 },
 plugins: [
   new DotEnv(),
   new ManifestPlugin(),
   new CleanWebpackPlugin(),
   new MiniCssExtractPlugin({
      filename: 'client.[name].css',
      chunkFilename: '[id].css',
  }),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
 ],
 ...resolve,
 stats: 'normal',
}
