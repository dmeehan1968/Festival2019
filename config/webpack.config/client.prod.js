import clientBase from './client.base'

export default {
  ...clientBase,
  mode: 'production',
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
}
