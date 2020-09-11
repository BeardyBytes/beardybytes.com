const { html } = require('common-tags')
const { Remarkable } = require('remarkable')

const remarkableOptions = {}

const renderer = new Remarkable(remarkableOptions)

const md = function md(fragments, ...interpolations) {
  const text = interpolations.reduce((acc, curr, index) => acc + curr + fragments[index + 1], fragments[0])

  return renderer.render(text)
}

md.cell = function mdCell(...args) {
  return html`
    <div class="cell md-cell">
      ${md(...args)}
    </div>
  `
}

module.exports = md
