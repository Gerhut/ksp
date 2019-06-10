/* eslint-env mocha */

const { resolve } = require('path')

const should = require('should')
const axiosist = require('axiosist')

const Koa = require('koa')
const ksp = require('..')

class KspApp extends Koa {
  /**
   * @param {import('../lib/config').KspConfiguration} [conf]
   */
  constructor (conf) {
    super()
    const controller = ksp(conf)
    this.use(controller)
  }
}

const root = resolve(__dirname, 'fixtures')

it('should works', async () => {
  const app = new KspApp({ root })
  const response = await axiosist(app.callback()).get('/hello.ksp')
  should(response.data).be.startWith('Hello world')
})

it('should 404', async () => {
  const app = new KspApp({ root })
  const response = await axiosist(app.callback()).get('/hello2.ksp')
  response.status.should.be.equal(404)
})

it('should index', async () => {
  const app = new KspApp({ root })
  const response = await axiosist(app.callback()).get('/')
  should(response.data).be.startWith('Hello index')
})

it('should not support nested index', async () => {
  const app = new KspApp({ root })
  const response = await axiosist(app.callback()).get('/hello')
  response.status.should.be.equal(404)
})

it('should support returned template', async () => {
  const app = new KspApp({ root })
  const response = await axiosist(app.callback()).get('/return.ksp')
  should(response.data).be.equal('returned')
})
