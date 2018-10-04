const path = require('path')

const debug = require('debug')('ksp')

/**
 * Get a decoded, normalized path
 * @param {string} rawPath
 * @return {string|null}
 */
module.exports = rawPath => {
  try {
    const decodedPath = decodeURIComponent(rawPath)
    const normalizedPath = path.posix.normalize(decodedPath)
    return normalizedPath
  } catch (error) {
    debug('normalize failed: %o', error)
    return null
  }
}
