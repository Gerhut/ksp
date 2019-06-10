#!/usr/bin/env node

const commander = require('commander')
const Koa = require('koa')

const ksp = require('.')
const { name, version, description } = require('./package.json')

commander
  .name(name)
  .version(version)
  .description(description)
  .option('-r, --root <root>', 'Root of pages', '.')
  .option('-i, --index <index>', 'Index filename', 'index.ksp')
  .option('--host <host>', 'Host to listen', '127.0.0.1')
  .option('-p, --port <port>', 'Port to listen', Number, process.env.PORT || 3000)
  .parse(process.argv)

const app = new Koa()

const { root, index, host, port } = commander
app.use(ksp({ root, index }))

const server = app.listen(port, host)
console.log('Listening on %s:%d', host, port)

process.once('SIGTERM', async () => {
  if (server.listening) {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
  process.exit(0)
})
