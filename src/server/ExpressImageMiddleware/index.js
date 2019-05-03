import path from 'path'
import fs from 'fs'
import os from 'os'
import moment from 'moment'
import imageResizeAndCache from './imageResizeAndCache'
import clamp from './clamp'

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

    if (query.height) {
      query.height = clamp(Math.ceil(Number(query.height)), 1, Number.MAX_SAFE_INTEGER)
    }
    if (query.width) {
      query.width = clamp(Math.ceil(Number(query.width)), 1, Number.MAX_SAFE_INTEGER)
    }
    if (query.quality) {
      query.quality = clamp(Number(query.quality), 1, 100)
    } else {
      query.quality = 80
    }

    const src = path.join(options.basePath, file)

    imageResizeAndCache(src, query, options)
    .then(cachedFile => {
      res.type(cachedFile.type)
      res.set({
        ETag: `"${cachedFile.hash}"`,
        'Last-Modified': (new Date(cachedFile.lastModified)).toUTCString(),
        'Cache-Control': 'no-cache, max-age=0',
        'Content-Length': cachedFile.size,
      })

      const noneMatch = req.get('If-None-Match')

      if (noneMatch) {
        if (noneMatch === `"${cachedFile.hash}"`) {
          res.set('X-Cache-Status', 'Matching eTag')
          return res.status(304).end()
        }
      } else {
        let modifiedSince = req.get('If-Modified-Since')

        if (modifiedSince) {
          modifiedSince = new Date(modifiedSince)
          if (cachedFile.lastModified <= modifiedSince) {
            res.set('X-Cache-Status', `Not Modfied Since`)
            return res.status(304).end()
          }
        }
      }

      res.set('X-Cache-Status', 'Generated')
      fs.createReadStream(cachedFile.path).pipe(res)
    })
    .catch(() => {
      console.log(`Not Found: ${src}`);
      res.status(404).end()
    })

  }
}
