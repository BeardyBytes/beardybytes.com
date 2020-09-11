const normalizeWhitespace = require('./normalizeWhitespace')

const NEW_LINE_EXP = /\n(?!$)/g

module.exports = function countLines(code) {
  const match = normalizeWhitespace(code).match(NEW_LINE_EXP)

  return match ? match.length + 1 : 1
}
