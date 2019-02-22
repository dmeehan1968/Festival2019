const assert = require('assert')
const fs = require('fs')

module.exports = function(config) {
  assert(config.distDir && typeof config.distDir == 'string',
    'distDir must be defined and must be a string')
  assert(Array.isArray(config.includes) && config.includes.filter(s => {
    assert(typeof s == 'string', 'includes must be strings')
    assert(fs.existsSync(s), `include '${s}' must exist`)
    return true
  }).length,
    'includes must be defined and must be an array of strings')
}
