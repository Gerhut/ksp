const { dirname } = require('path')
const { renderFile } = require('ejs')

const COMPILE_OPTIONS = {
  _with: false,
  localsName: 'context',
  async: true
}

module.exports = async (context, filename) => {
  context.__filename = filename
  context.__dirname = dirname(filename)
  const result = await renderFile(filename, context, COMPILE_OPTIONS)
  if (result !== undefined) context.body = result
}
