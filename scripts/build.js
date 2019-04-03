import runner from './runner'

runner({
  mode: process.env.NODE_ENV || 'production',
  hmr: false,
  devServer: false,
})
