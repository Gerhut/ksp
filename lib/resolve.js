const { normalize, join } = require('path')
const { stat } = require('fs')
const { promisify } = require('util')

const pStat = promisify(stat)

/**
 * @param {import('koa').Context} context
 * @param {import('./config').KspConfiguration} configuration
 * @returns {Promise<string>}
 */
module.exports = async (context, { root, index }) => {
  const normalizedPath = normalize(context.path)
  let pathname = join(root, normalizedPath)

  try {
    let stats = await pStat(pathname)

    if (stats.isFile()) {
      return pathname
    }
    if (stats.isDirectory()) {
      pathname = join(pathname, index)
      stats = await pStat(pathname)

      if (stats.isFile()) {
        return pathname
      }
    }
    return context.throw(404, 'Invalid stats', { pathname, stats })
  } catch (err) {
    if (err.code) {
      return context.throw(404, 'Stat failed', { pathname, err })
    }
    throw err
  }
}
