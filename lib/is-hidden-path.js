const path = require('path')

const debug = require('debug')('ksp')

module.exports = pathname => {
  while (pathname !== '/') {
    const basename = path.posix.basename(pathname)
    if (basename.charAt(0) === '.') {
      debug('hidden name: %s', basename)
      return true
    }

    pathname = path.posix.dirname(pathname)
  }
  return false
}
