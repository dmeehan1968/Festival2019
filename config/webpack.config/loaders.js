import path from 'path'
import paths from '../paths'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const cssLoaderBase = {
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    sourceMap: true,
    localIdentName: '[name]_[local]_[contenthash:base64:5]',
    camelCase: true,
  }
}

const lessLoaderClient = {
    test: /\.less$/,
    use: [
      require.resolve('css-hot-loader'),
      MiniCssExtractPlugin.loader,
      cssLoaderBase,
      'less-loader',
    ],
}

const lessLoaderServer = {
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoaderBase,
    'less-loader',
  ],
}


const fileLoader = (options = {}) => ({
  test: /\.(jpg|png|gif)$/,
  include: paths.src,
  use: [
    {
      loader: 'file-loader',
      options: {
        ...options
      },
    },
  ],
})

const babelLoader = {
  test: /\.(js|jsx)$/,
  include: paths.src,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
    },
  },
}

const client = [
  lessLoaderClient,
  fileLoader(),
  babelLoader,
]

const server = [
  lessLoaderServer,
  fileLoader({ emitFile: false }),
  babelLoader,
]

export default {
  client,
  server,
}
