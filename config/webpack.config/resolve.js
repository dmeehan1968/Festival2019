import path from 'path'

export default {
  resolve: {
    alias: {
      app: path.resolve(process.cwd(), 'src/app/'),
      server: path.resolve(process.cwd(), 'src/server/'),
      client: path.resolve(process.cwd(), 'src/client/'),
      models: path.resolve(process.cwd(), 'src/models/'),
      static: path.resolve(process.cwd(), 'src/static/'),
      styles: path.resolve(process.cwd(), 'src/styles/'),
    },
  },
}
