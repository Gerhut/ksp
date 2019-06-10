const { promises: { stat } } = require('fs')
const { basename, extname, join, normalize, resolve } = require('path')

const debug = require('debug')('ksp')

const render = require('./lib/render')

/**
 * @param {object} options
 * @param {string} [options.root='.']
 * @param {string} [options.index='index.ksp']
 * @returns {import('koa').Middleware}
 */
module.exports = ({ root = '.', index = 'index.ksp' } = {}) => {
  // Normalize arguments
  root = resolve(root)
  index = basename(index)

  debug('root: %s', root)
  debug('index %s', index)

  const renderFunction = render({ root })

  return async (context, next) => {
    try {
      let filename = normalize(context.path)
      filename = join(root, filename)

      let stats = await stat(filename)
      if (stats.isDirectory()) {
        debug('%s is directory, appending %s', filename, index)
        filename = join(filename, index)
        stats = await stat(filename)
      }

      const extension = extname(filename)
      if (extension === '.ksp') {
        debug('render %s', filename)
        return await renderFunction(context, filename)
      }
    } catch (error) {
      debug('Error %o', error)
      const { code } = error
      context.assert(code !== 'EACCES', 403)
      context.assert(code !== 'EISDIR', 403)
      context.assert(code !== 'ENOENT', 404)
      context.assert(code !== 'EMFILE', 503)
      throw error
    }
    return next()
  }
}
