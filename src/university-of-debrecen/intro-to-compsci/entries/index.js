const requireAll = require('../../../util/require-all')

module.exports = (function entriesFactory() {
  const entries = requireAll(__dirname, ['index.js']).filter((a) => a.meta.order >= 7)

  entries.sort((a, b) => a.meta.order - b.meta.order)

  return entries
})()
