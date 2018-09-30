const send = require('koa-send')

module.exports = async (context, filename) => {
  return send(context, filename, {
    root: '/'
  })
}
