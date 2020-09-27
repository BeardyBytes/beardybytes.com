const katex = require('katex')

const tex = function tex(fragments, ...interpolations) {
  const text = interpolations.reduce((acc, curr, index) => acc + curr + fragments[index + 1], fragments[0])

  return katex.renderToString(text, {
    throwOnError: false,
  })
}

module.exports = tex
