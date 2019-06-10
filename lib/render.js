const { dirname } = require('path')

const { renderFile } = require('ejs')

/**
 * @callback RenderFunction
 * @param {import('koa').Context} context
 * @param {string} filename
 */

/**
 * @param {object} options
 * @param {string} options.root
 * @returns {RenderFunction}
 */
module.exports = ({ root }) => {
  const options = {
    root,
    strict: true,
    _with: false,
    localsName: 'context',
    async: true
  }
  return async (context, filename) => {
    context.__filename = filename
    context.__dirname = dirname(filename)
    const result = await renderFile(filename, context, options)
    if (result !== undefined) context.body = result
  }
}
