const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [04-nemdeterminisztikus-veges-automatak-regularis-kifejezesek-feladatsor.pdf](./files/04-nemdeterminisztikus-veges-automatak-regularis-kifejezesek-feladatsor.pdf)
`,
]

const meta = {
  order: 4,
  layout: 'practice',
  urlTitle: '04-nemdeterminisztikus-veges-automatak-regularis-kifejezesek',
  publishedAt: DateTime.local(2020, 9, 30, 9, 43),
  draft: false,
}

const content = {
  title: '4. gyakorlat – Nemdeterminisztikus véges automaták, reguláris kifejezések',
  excerpt:
    'Nemdeterminisztikus véges automatákból készítettünk velük ekvivalens determinisztikus véges automatát, valamint reguláris kifejezéseket írtunk fel.',
  cells,
}

module.exports = {
  meta,
  content,
}
