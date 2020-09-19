const axios = require('axios').default
const { html } = require('common-tags')

const unquote = function unquote(fragments, ...interpolations) {
  return interpolations.reduce((acc, curr, index) => acc + curr + fragments[index + 1], fragments[0])
}

const cellFactory = function cellFactory(type, format) {
  return function cell(...args) {
    const diagramText = unquote(...args)

    return async () => {
      const diagram = await axios.post(`https://kroki.io/${type}/${format}`, diagramText, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })

      return html`
        <div class="cell md-cell">
          ${diagram}
        </div>
      `
    }
  }
}

module.exports = {
  cell: cellFactory,
}
