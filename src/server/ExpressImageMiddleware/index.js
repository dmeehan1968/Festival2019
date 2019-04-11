import path from 'path'
import fs from 'fs'
import os from 'os'
import moment from 'moment'
import sharp from 'sharp'
import hash from 'object-hash'
import shrinkToFit from './shrinkToFit'

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

  console.log(options)

  if (!fs.existsSync(options.cachePath)) {
    fs.mkdirSync(options.cachePath, { recursive: true })
  }

  return (req, res, next) => {
    const { path: file, params, method } = req
    let { query } = req
    console.log(method)
    console.log(file)
    console.log(params)
    console.log(query)

    query = {
      ...query,
      ...(query.height && { height: Number(query.height) } || {}),
      ...(query.width && { width: Number(query.width) } || {}),
    }
    const src = path.join(options.basePath, file)

    let diff={}
    let transform = sharp(src)
    transform.metadata()
    .then(metadata => {
      diff = metaDiff(metadata, query)
      const shrunk = shrinkToFit([metadata.height, metadata.width], [diff.height, diff.width])
      if (shrunk) {
        diff = {
          ...diff,
          height: shrunk[0],
          width: shrunk[1]
        }
      } else {
        delete diff.height;
        delete diff.width;
      }
      if (diff.format) {
        transform = transform.toFormat(diff.format)
      } else {
        diff.format = metadata.format
      }
    })
    .then(() => {
      if (diff.height || diff.width) {
        transform = transform.resize(diff.width, diff.height)
      }

      diff.src = src

      console.log('diff', diff)

      const outFile = path.join(options.cachePath, hash(diff) + '.' + diff.format)

      if (fs.existsSync(outFile)) {
        const stat = fs.statSync(outFile)
        console.log(stat.mtime)
        const mtime = moment(stat.mtime)
        const age = moment().diff(mtime, 'seconds')
        if (age < options.maxAge) {
          console.log('Cached: ', outFile)
          return { outFile }
        } else {
          console.log('Purged: ', outFile)
          fs.unlinkSync(outFile)
        }
      }
      console.log('Generated: ', outFile)
      return transform.toFile(outFile).then(info => ({ outFile, info }))
    })
    .then(({ outFile, info }) => {
      // res.type('image/jpg')
      fs.createReadStream(outFile).pipe(res)
    })
  }
}

const metaDiff = (a, b) => {
  return Object.keys(b).reduce((acc, key) => {
    if (a.hasOwnProperty(key)) {
      if (a[key] !== b[key]) {
        return { ...acc, [key]: b[key] }
      }
    }
    return acc
  }, {})
}
