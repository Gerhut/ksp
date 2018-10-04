const fs = require('fs')
const path = require('path')
const util = require('util')

const stat = util.promisify(fs.stat)

module.exports = async (pathname, index) => {
  try {
    const stats = await stat(pathname)
    if (stats.isDirectory()) {
      pathname = path.resolve(pathname, index)
    }
  } catch (error) {

  }
}
