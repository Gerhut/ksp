const debug = require('debug')('ksp')

const config = require('./lib/config')
const resolve = require('./lib/resolve')
const render = require('./lib/render')

/**
 * @param {import('./lib/config').KspConfiguration} [conf]
 * @returns {import('koa').Middleware}
 */
module.exports = (conf) => {
  const configuration = config(conf)
  debug('configuration: %o', configuration)

  const renderFunction = render(configuration)

  return async (context) => {
    const pathname = await resolve(context, configuration)
    debug('pathname: %s', pathname)

    const renderResult = await renderFunction(context, pathname)
    if (context.body === undefined) {
      context.body = renderResult
    }
  }
}
