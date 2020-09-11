const { readdirSync } = require('fs')
const path = require('path')

module.exports = function requireAll(directory, exclusions) {
  let entries
  try {
    entries = readdirSync(directory)
  } catch {
    entries = []
  }

  return entries
    .filter((entry) => !exclusions.includes(entry))
    .map((entry) => path.join(directory, entry))
    .map((filename) => require(filename))
}
