var CleanCSS = require('clean-css')

function transformer(options) {
  return options.minify ? new CleanCSS().minify(options.code).styles : options.code
}

transformer.type = 'css'

module.exports = transformer
