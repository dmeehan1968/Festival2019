import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import shrinkToFit from './shrinkToFit'
import NodeObjectHash from 'node-object-hash'
const objectHash = NodeObjectHash({ sort: true, coerce: true }).hash

const getOptimalBreakpoint = (breakpoints, requested) => {
  let optimalBreakpoint
  Object.keys(breakpoints).forEach(key => {
    const bp = breakpoints[key]
    if (requested.width && bp.width && requested.width <= bp.width && !optimalBreakpoint) {
      optimalBreakpoint = bp
    }
  })
  return optimalBreakpoint
}

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
      const imageRatio = metadata.width / metadata.height
      const optimalBreakpoint = getOptimalBreakpoint(options.breakpoints, { width: diff.width, height: diff.height })
      if (diff.width && optimalBreakpoint && optimalBreakpoint.width) {
        diff.width = optimalBreakpoint.width
        diff.height = Math.ceil(diff.width / imageRatio)
      }
      if (diff.height && optimalBreakpoint && optimalBreakpoint.height) {
        diff.height = optimalBreakpoint.height
        diff.width = Math.ceil(optimalBreakpoint.height * imageRatio)
      }
    } else {
      delete diff.height;
      delete diff.width;
    }

    diff.quality = query.quality
    diff.src = src
    diff.format = diff.format || metadata.format
  })
  .then(() => {

    const hash = objectHash(diff)

    const result = {
      path: path.join(options.cachePath, hash + '.' + diff.format),
      type: diff.format,
      hash,
    }

    if (fs.existsSync(result.path)) {
      const stat = fs.statSync(result.path)
      const age = (Date.now() - stat.mtimeMs) / 1000

      if (age > options.maxAge || stat.size === 0) {
        fs.unlinkSync(result.path)
      } else {
        result.lastModified = stat.mtimeMs
        result.size = stat.size
        return result
      }
    }

    if (diff.height || diff.width) {
      transform = transform.resize(diff.width, diff.height)
    }

    transform = transform.toFormat(diff.format || metadata.format, { quality: query.quality })

    return transform
      .toFile(result.path)
      .then(() => {
        const stat = fs.statSync(result.path)
        result.lastModified = stat.mtimeMs
        result.size = stat.size
        return result
      })
  })

}

const metaDiff = (a, b) => {
  return Object.keys(b).reduce((acc, key) => {
    if (a.hasOwnProperty(key)) {
      if (a[key] !== b[key]) {
        acc[key] = b[key]
        return acc
      }
    }
    return acc
  }, {})
}
