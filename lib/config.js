const { basename, resolve } = require('path')

/**
 * @typedef {object} KspConfiguration
 * @property {string} [root="."]
 * @property {string} [index="index.ksp"]
 */

/**
 * @param {KspConfiguration} [configuration]
 * @returns {KspConfiguration}
 */
module.exports = ({ root = '.', index = 'index.ksp' } = {}) => ({
  root: resolve(root),
  index: basename(index)
})
