import fs from 'fs'
import path from 'path'

const rootPath = fs.realpathSync(process.cwd())
const resolve = (relativePath) => path.resolve(rootPath, relativePath)

export default {
  clientBuild: resolve('build/client'),
  serverBuild: resolve('build/server'),
  src: resolve('src'),
  srcClient: resolve('src/node_modules/client'),
  srcServer: resolve('src/node_modules/server'),
  publicPath: 'static/',
}
