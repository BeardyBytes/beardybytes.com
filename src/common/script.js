const { mergedValue } = require('../util/merge')

const inlineCode = function inlineCode(code) {
  return `
    <script>
    ${code}
    </script>
    `
}

const emitCode = function emitCode(code, context) {
  const url = `${context.javascriptPath}/${context.path}`

  context.emit.push({
    content: code,
    url,
  })

  return `
        <script src="${url}"></script>
    `
}

module.exports = function script(code, path) {
  return function scriptEmitter(context, options = {}) {
    const config = Object.assign({}, context, options)

    config.inline = mergedValue(['inline', 'inlineJavaScript'], options, context)
    config.minify = mergedValue(['minify', 'minifyJavaScript'], options, context)
    config.code = code(config)
    config.path = path

    const transformedCode = context.transform('javascript', config)

    return config.inline ? inlineCode(transformedCode, config) : emitCode(transformedCode, config)
  }
}
