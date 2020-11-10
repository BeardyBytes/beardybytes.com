const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [08-chomsky-normalforma-cyk-algoritmus-feladatsor.pdf](./files/08-chomsky-normalforma-cyk-algoritmus-feladatsor.pdf)
`,
]

const meta = {
  order: 8,
  layout: 'practice',
  urlTitle: '08-chomsky-normalforma-cyk-algoritmus',
  publishedAt: DateTime.local(2020, 11, 10, 16, 40),
  draft: false,
}

const content = {
  title: '8. gyakorlat – Chomsky normálforma, Cocke-Younger-Kasami algoritmus',
  excerpt:
    'A gyakorlat első felében grammatikákat hozunk Chomsky normálformára. Ezt követően a Cocke-Younger-Kasami algoritmust használjuk, és eldöntjük, hogy adott szó benne van-e adott grammatika által generált nyelvben. ',
  cells,
}

module.exports = {
  meta,
  content,
}
