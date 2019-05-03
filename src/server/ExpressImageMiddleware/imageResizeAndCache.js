import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import hash from 'object-hash'
import shrinkToFit from './shrinkToFit'

export default (src, query, options) => {

  let diff={}
  let transform = sharp(src)

  return transform.metadata()
  .then(metadata => {
    diff = metaDiff(metadata, query)
    const shrunk = shrinkToFit([metadata.height, metadata.width], [diff.height, diff.width])
    if (shrunk) {
      diff.height = shrunk[0]
      diff.width = shrunk[1]
    } else {
      delete diff.height;
      delete diff.width;
    }

    diff.quality = query.quality
    diff.src = src
    diff.format = diff.format || metadata.format
  })
  .then(() => {

    if (diff.height || diff.width) {
      transform = transform.resize(diff.width, diff.height)
    }

    transform = transform.toFormat(diff.format || metadata.format, { quality: query.quality })

    const outFile = path.join(options.cachePath, hash(diff) + '.' + diff.format)

    if (fs.existsSync(outFile)) {
      const stat = fs.statSync(outFile)

      const age = (Date.now() - stat.mtimeMs) / 1000
      if (age < options.maxAge && stat.size > 0) {
        // console.log('Cached: ', outFile)
        return outFile
      } else {
        // console.log('Purged: ', outFile)
        fs.unlinkSync(outFile)
      }
    }

    // console.log('Generated: ', outFile)
    return transform.toFile(outFile).then(() => outFile)
  })
  .catch(err => console.log(err))

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
