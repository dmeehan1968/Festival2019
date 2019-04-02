import fs from 'fs'

let manifest
let options = {}

const getManifest = () => {
  if (manifest && options.cache) return manifest
  manifest = JSON.parse(fs.readFileSync(options.manifestPath, 'utf8'))
  return manifest
}

const assetPath = asset => {
  const manifest = getManifest()
  return manifest[asset] || ''
}

export default (opts) => {
  const defaults = {
    cache: true,
    prependPath: '',
  }

  manifest = null

  Object.assign(options, defaults, opts)

  return (req, res, next) => {
    res.locals = {
      ...res.locals || {},
      assetPath,
    }
    next()
  }


}
