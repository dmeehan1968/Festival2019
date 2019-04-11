import path from 'path'
import fs from 'fs'
import moment from 'moment'
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

    const outFile = path.join(options.cachePath, hash(diff) + '.' + diff.format)

    if (fs.existsSync(outFile)) {
      const stat = fs.statSync(outFile)
      const mtime = moment(stat.mtime)
      const age = moment().diff(mtime, 'seconds')
      if (age < options.maxAge) {
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
