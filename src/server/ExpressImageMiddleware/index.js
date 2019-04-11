import path from 'path'
import fs from 'fs'
import os from 'os'
import imageResizeAndCache from './imageResizeAndCache'

export default (
  options = {}
) => {

  const defaults = {
    basePath: process.cwd(),
    cachePath: path.join(os.tmpdir(), 'uk.co.replicated.ExpressImageMiddleware'),
    maxAge: 86400,
  }

  if (typeof options === 'string') {
    options = { basePath: options }
  }

  options = Object.assign({}, defaults, options)

  if (!fs.existsSync(options.cachePath)) {
    fs.mkdirSync(options.cachePath, { recursive: true })
  }

  return (req, res, next) => {
    const { path: file, params, method } = req
    let { query } = req

    query = {
      ...query,
      ...(query.height && { height: Number(query.height) } || {}),
      ...(query.width && { width: Number(query.width) } || {}),
    }
    const src = path.join(options.basePath, file)

    imageResizeAndCache(src, query, options)
    .then(cachedFile => {
      // res.type(path.extname(cachedFile))
      fs.createReadStream(cachedFile).pipe(res)
    })

  }
}
