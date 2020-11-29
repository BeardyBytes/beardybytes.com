const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [12-turing-gep-feladatsor.pdf](./files/12-turing-gep-feladatsor.pdf)
`,
]

const meta = {
  order: 11,
  layout: 'practice',
  urlTitle: '12-turing-gep',
  publishedAt: DateTime.local(2020, 11, 29, 20, 0),
  draft: false,
}

const content = {
  title: '12. gyakorlat – Turing-gép',
  excerpt: 'A kurzus zárásaként Turing-gépekkel kapcsolatos feladatokat oldunk meg.',
  cells,
}

module.exports = {
  meta,
  content,
}
