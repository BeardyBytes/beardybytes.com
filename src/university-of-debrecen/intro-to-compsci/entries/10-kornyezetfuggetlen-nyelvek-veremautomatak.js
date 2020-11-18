const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [10-kornyezetfuggetlen-nyelvek-veremautomatak-feladatsor.pdf](./files/10-kornyezetfuggetlen-nyelvek-veremautomatak-feladatsor.pdf)
`,
]

const meta = {
  order: 9,
  layout: 'practice',
  urlTitle: '10-kornyezetfuggetlen-nyelvek-veremautomatak',
  publishedAt: DateTime.local(2020, 11, 18, 2, 10),
  draft: false,
}

const content = {
  title: '10. gyakorlat – Környezetfüggetlen nyelvek, veremautomaták',
  excerpt:
    'Ezen a gyakorlaton részletesebben foglalkozunk a veremautomaták és a környezetfüggetlen nyelvek kapcsolatával.',
  cells,
}

module.exports = {
  meta,
  content,
}
