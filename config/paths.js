import fs from 'fs'
import path from 'path'

const rootPath = fs.realpathSync(process.cwd())
const resolve = (relativePath) => path.resolve(rootPath, relativePath)

const clientBuild = resolve('build/client')
const serverBuild = resolve('build/server')
const src = resolve('src')
const publicPath = 'static/'

export default {
  clientBuild,
  serverBuild,
  src,
  srcClient: path.join(src, 'node_modules/client'),
  srcServer: path.join(src, 'node_modules/server'),
  publicPath,
  clientWebroot: path.join(clientBuild, publicPath),
  serverWebroot: path.join(serverBuild, publicPath),
}
