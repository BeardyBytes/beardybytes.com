const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [07-regularis-es-kornyezetfuggetlen-grammatikak-feladatsor.pdf](./files/07-regularis-es-kornyezetfuggetlen-grammatikak-feladatsor.pdf)
`,
]

const meta = {
  order: 7,
  layout: 'practice',
  urlTitle: '07-regularis-es-kornyezetfuggetlen-grammatikak',
  publishedAt: DateTime.local(2020, 11, 10, 16, 40),
  draft: false,
}

const content = {
  title: '7. gyakorlat – Reguláris és környezetfüggetlen grammatikák',
  excerpt:
    'Véges automatából készítünk reguláris grammatikát, majd fordítva. Ezután környezetfüggetlen grammatikákkal foglalkozunk.',
  cells,
}

module.exports = {
  meta,
  content,
}
