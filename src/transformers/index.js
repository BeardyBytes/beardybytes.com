const requireAll = require('../util/require-all')

const transformers = (function loadTransformers() {
  const result = {}

  requireAll(__dirname, ['index.js']).forEach((transformer) => (result[transformer.type] = transformer))

  return result
})()

module.exports = transformers
