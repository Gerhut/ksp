const path = require('path')

class EmptyMap extends Map {
  has (key) { return false }
}

module.exports = ({ root, index }) => {
  const production = process.env.NODE_ENV === 'production'
  const cache = production ? new Map() : new EmptyMap()
  return context => {
    const normalizedPath = path.normalize(context.path)
    if (cache.has(normalizedPath)) {

    }
  }
}
