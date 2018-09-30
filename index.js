const fs = require('fs')
const path = require('path')
const util = require('util')

const debug = require('debug')('ksp')

const render = require('./lib/render')
const send = require('./lib/send')

const stat = util.promisify(fs.stat)

module.exports = ({
  root: pageDirectory,
  index: indexFilename = 'index.ksp'
} = {}) => {
  // Normalize arguments
  pageDirectory = path.resolve(pageDirectory)
  indexFilename = path.basename(indexFilename)

  debug('root: %s', pageDirectory)
  debug('index %s', indexFilename)

  return async context => {
    try {
      let filename = path.normalize(context.path)
      filename = path.join(pageDirectory, filename)
      let stats = await stat(filename)
      while (stats.isDirectory()) {
        debug('%s is directory, appending %s', filename, indexFilename)
        filename = path.join(filename, indexFilename)
        stats = await stat(filename)
      }

      const extension = path.extname(filename)
      if (extension === '.ksp') {
        debug('render %s', filename)
        return await render(context, filename)
      } else {
        debug('send %s', filename)
        return await send(context, filename)
      }
    } catch (error) {
      debug('Error %o', error)
      context.assert(error.code !== 'ENOENT', 404)
      context.assert(error.code !== 'EPERM', 403)
      throw error
    }
  }
}
