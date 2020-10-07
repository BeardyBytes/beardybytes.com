const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [05-regularis-kifejezesbol-automata-es-vissza-feladatsor.pdf](./files/05-regularis-kifejezesbol-automata-es-vissza-feladatsor.pdf)
`,
]

const meta = {
  order: 5,
  layout: 'practice',
  urlTitle: '05-regularis-kifejezesbol-automata-es-vissza',
  publishedAt: DateTime.local(2020, 10, 7, 9, 43),
  draft: false,
}

const content = {
  title: '5. gyakorlat – Reguláris kifejezésből automata és vissza',
  excerpt:
    'Reguláris kifejezésből készítünk véges automatát, majd megnézzük a másik irányt is, véges automatához írunk fel reguláris kifejezést.',
  cells,
}

module.exports = {
  meta,
  content,
}
