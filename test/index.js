/* eslint-env mocha */

const path = require('path')

const should = require('should')
const axiosist = require('axiosist')

const Koa = require('koa')
const ksp = require('..')

class KspApp extends Koa {
  constructor (options) {
    super()
    const controller = ksp(options)
    this.use(controller)
  }
}

it('should works', async () => {
  const app = new KspApp({ root: path.resolve(__dirname, 'fixtures') })
  const response = await axiosist(app.callback()).get('/hello.ksp')
  should(response.data).be.startWith('Hello world')
})

it('should 404', async () => {
  const app = new KspApp({ root: path.resolve(__dirname, 'fixtures') })
  try {
    await axiosist(app.callback()).get('/hello2.ksp')
    should.fail()
  } catch (error) {
    should(error.response.status).be.equal(404)
  }
})

it('should index', async () => {
  const app = new KspApp({ root: path.resolve(__dirname, 'fixtures') })
  const response = await axiosist(app.callback()).get('/')
  should(response.data).be.startWith('Hello index')
})

it('should serve static file', async () => {
  const app = new KspApp({ root: path.resolve(__dirname, 'fixtures') })
  const response = await axiosist(app.callback()).get('/here.css')
  should(response.headers['content-type']).be.startWith('text/css')
  should(response.data).be.startWith('a { color: red }')
})

it('should support returned template', async () => {
  const app = new KspApp({ root: path.resolve(__dirname, 'fixtures') })
  const response = await axiosist(app.callback()).get('/return.ksp')
  should(response.data).be.equal('returned')
})
