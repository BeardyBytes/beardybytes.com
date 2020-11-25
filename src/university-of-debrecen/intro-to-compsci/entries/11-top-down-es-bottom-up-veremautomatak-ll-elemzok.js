const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [11-top-down-es-bottom-up-veremautomatak-ll-elemzok-feladatsor.pdf](./files/11-top-down-es-bottom-up-veremautomatak-ll-elemzok-feladatsor.pdf)
`,
]

const meta = {
  order: 10,
  layout: 'practice',
  urlTitle: '11-top-down-es-bottom-up-veremautomatak-ll-elemzok',
  publishedAt: DateTime.local(2020, 11, 25, 2, 20),
  draft: false,
}

const content = {
  title: '11. gyakorlat – Top-down és bottom-up veremautomaták, LL-elemzők',
  excerpt:
    'Ezen a gyakorlaton részletesen megvizsgálunk két stratégiát, melyekkel adott környezetfüggetlen nyelvhez veremautomatát lehet készíteni. Ezt követően belekóstolunk az LL-elemzésbe.',
  cells,
}

module.exports = {
  meta,
  content,
}