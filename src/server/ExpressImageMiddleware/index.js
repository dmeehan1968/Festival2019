import path from 'path'
import fs from 'fs'
import os from 'os'
import moment from 'moment'
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
      const { name: etag } = path.parse(cachedFile)
      const stat = fs.statSync(cachedFile)

      res.set('ETag', etag)
      res.set('Last-Modified', stat.mtime.toUTCString())
      res.set('Cache-Control', 'no-cache, max-age=0')
      res.type(path.extname(cachedFile))

      const modifiedSince = req.get('If-Modified-Since')

      if (modifiedSince) {
        const age = moment(modifiedSince).diff(moment(stat.mtime), 'seconds')
        if (age >= 0) {
          return res.status(304).end()
        }
      }

      const noneMatch = req.get('If-None-Match')

      if (noneMatch && noneMatch !== etag) {
        return res.status(304).end()
      }

      fs.createReadStream(cachedFile).pipe(res)
    })

  }
}
