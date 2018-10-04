const fs = require('fs')
const path = require('path')
const util = require('util')

const debug = require('debug')('ksp')

const normalizePath = require('./lib/normalize-path')
const isHiddenPath = require('./lib/is-hidden-path')

// Promisify some functions
const stat = util.promisify(fs.stat)
const readFile = util.promisify(fs.readFile)

module.exports = ({
  root,
  index = 'index.ksp'
} = {}) => {
  // Normalize arguments
  root = path.resolve(root)
  index = path.basename(index)

  debug('root: %s', root)
  debug('index %s', index)

  return async context => {
    const normalizedPath = normalizePath(context)

    context.assert(normalizedPath !== null, 400)
    context.assert(!isHiddenPath(normalizedPath), 403)

    let pathname = path.join(root, normalizedPath)
    const stats = await stat(pathname)
    if (stats.isDirectory()) {
      pathname = path.resolve(pathname, index)
    }



    if (extension === '.ksp') {
      // .ksp file: read its content and compile it to controller
      let content
      try {
        content = await readFile(fullPath, { encoding: 'utf8' })
      } catch (error) {
        if (error.code === 'EISDIR') {
          content = await readFile(path.join(fullPath, index), { encoding: 'utf8' })
        } else {
          throw error
        }
      }
    } else {
      // Other file: send its content directly
      const readStream = fs.createReadStream(fullPath)
      context.body = readStream
    }

    try {
      let stats = await stat(filename)
      while (stats.isDirectory()) {
        debug('%s is directory, appending %s', filename, index)
        filename = path.join(filename, index)
        stats = await stat(filename)
      }
    } catch (error) {
      debug('Error %o', error)
      context.assert(error.code !== 'ENOENT', 404)
      context.assert(error.code !== 'EPERM', 403)
      throw error
    }

    const extension = path.extname(filename)
    if (extension === '.ksp') {
      debug('render %s', filename)
      return render(context, filename)
    } else {
      debug('send %s', filename)
      return send(context, filename)
    }
  }
}
