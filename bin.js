#!/usr/src/env node

const path = require('path')
const util = require('util')

const commander = require('commander')
const debug = require('debug')('ksp')
const Koa = require('koa')
const glob = require('glob')

const ksp = require('.')
const { name, description, version } = require('./package.json')

commander
  .name(name)
  .version(version)
  .description(description)
  .option('-r --root', 'Root of pages', 'pages')
  .option('-i --index', 'Index filename', 'index.ksp')
  .option('-m --middlewares', 'Root of middlewares', path.resolve, 'middlewares')
  .option('--host', 'Host to listen', '127.0.0.1')
  .option('-p --port', 'Port to listen', parseInt, process.env.PORT || 3000)
  .parse(process.argv)

const app = new Koa()

// Use middlewares
const middlewareFiles = glob.sync('**/*.js', {
  cwd: commander.middlewares,
  nodir: true
})
for (let middlewareFile of middlewareFiles) {
  middlewareFile = path.resolve(commander.middlewares, middlewareFile)
  debug('use: %s', middlewareFile)
  app.use(require(middlewareFile))
}

app.use(ksp({
  root: commander.root,
  index: commander.index
}))

const server = app.listen(commander.host, commander.port)
console.log('Listening on %s:%d', commander.host, commander.port)

process.once('SIGTERM', async () => {
  if (server.listening) {
    await util.promisify(callback => server.close(callback))()
  }
  process.exit(0)
})
