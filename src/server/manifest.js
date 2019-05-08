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

const getPathsByType = type => {
  const manifest = getManifest()
  const regex = new RegExp(`\.${type}$`, 'i')
  const keys = Object.keys(manifest).filter(name => regex.test(name))
  return keys.map(name => manifest[name])
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
      getPathsByType,
    }
    next()
  }


}
