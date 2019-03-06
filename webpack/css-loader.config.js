module.exports = {
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    sourceMap: true,
    localIdentName: '[name]_[local]_[contenthash:base64:5]',
    camelCase: true,
  },
}
