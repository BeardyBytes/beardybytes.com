const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorló feladatsor elérhető a következő linken:

> [elso-zarthelyi-gyakorlo-feladatsor.pdf](./files/elso-zarthelyi-gyakorlo-feladatsor.pdf)
`,
]

const meta = {
  order: 6,
  layout: 'practice',
  urlTitle: '06-gyakorlas-az-elso-zarthelyire',
  publishedAt: DateTime.local(2020, 10, 14, 0, 30),
  draft: false,
}

const content = {
  title: '6. gyakorlat – Gyakorlás az első zárthelyire',
  excerpt: 'Átismételjük azokat az algoritmusokat és megoldási recepteket, melyeket az előző gyakorlatokon tanultunk.',
  cells,
}

module.exports = {
  meta,
  content,
}
