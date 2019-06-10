const { renderFile } = require('ejs')

/**
 * @callback RenderFunction
 * @param {import('koa').Context} context
 * @param {string} pathname
 * @returns {Promise<string | undefined>}
 */

/**
 * @param {import('./config').KspConfiguration} configuration
 * @returns {RenderFunction}
 */
module.exports = ({ root }) => {
  const options = {
    root,
    strict: true,
    localsName: 'context',
    async: true
  }

  return async (context, filename) => {
    return renderFile(filename, context, options)
  }
}
