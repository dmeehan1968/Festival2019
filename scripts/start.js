import runner from './runner'

runner({
  mode: process.env.NODE_ENV || 'development',
  hmr: true,
  devServer: true,
})
