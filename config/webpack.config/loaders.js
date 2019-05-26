import path from 'path'
import paths from '../paths'
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
  include: [
    paths.src,
    require.resolve('redux-storage-engine-localstorage/src'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: '3.0.1',
            targets: '> 0.25%, not dead', // client
            modules: false,
            debug: false,
          }
        ],
        '@babel/preset-react',
      ],
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            ssr: true,
            displayName: true,
            minify: true,
            transpileTemplateLiterals: true,
          }
        ],
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
  {
    ...babelLoader,
    use: {
      ...babelLoader.use,
      options: {
        ...babelLoader.use.options,
        presets: [
          ...babelLoader.use.options.presets.map(preset => {
            if (Array.isArray(preset) && preset[0] === '@babel/preset-env') {
              return [
                preset[0],
                {
                  ...preset[1],
                  targets: {
                    node: true,
                  },
                  debug: false,
                }
              ]
            }
            return preset
          })
        ],
        plugins: [
          ...(babelLoader.use.options.plugins || []),
          'inline-dotenv',
        ]
      }
    }
  },
]

export default {
  client,
  server,
}
