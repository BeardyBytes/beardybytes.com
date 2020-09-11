const UglifyJS = require('uglify-es')

const config = require('../config')

function transformer(options) {
  const shouldMinify = Object.assign({}, config, options).minifyJavaScript

  return shouldMinify ? UglifyJS.minify(options.code).code : options.code
}

transformer.type = 'javascript'

module.exports = transformer
