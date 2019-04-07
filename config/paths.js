import fs from 'fs'
import path from 'path'

const rootPath = fs.realpathSync(process.cwd())
const resolve = (relativePath) => path.resolve(rootPath, relativePath)

const clientBuild = resolve('build/client')
const serverBuild = resolve('build/server')
const src = resolve('src')
const publicPath = '/static/'

export default {
  clientBuild,
  serverBuild,
  src,
  srcClient: path.join(src, 'client'),
  srcServer: path.join(src, 'server'),
  publicPath,
  manifestPath: path.join(clientBuild, 'manifest.json'),
}
