const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')
const { subsection, subsubsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [11-top-down-es-bottom-up-veremautomatak-ll-elemzok-feladatsor.pdf](./files/11-top-down-es-bottom-up-veremautomatak-ll-elemzok-feladatsor.pdf)
`,
  subsection.cell`1. feladat`,
  subsubsection.cell`Top-down veremautoma`,
  md.cell`<img src="files/11-1-top-down.svg" >`,
  subsubsection.cell`Bottom-up veremautoma`,
  md.cell`<img src="files/11-1-bottom-up.svg" >`,
]

const meta = {
  order: 11,
  layout: 'practice',
  urlTitle: '11-top-down-es-bottom-up-veremautomatak-ll-elemzok',
  publishedAt: DateTime.local(2020, 11, 25, 2, 20),
  draft: true,

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
